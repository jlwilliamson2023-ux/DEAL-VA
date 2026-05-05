const express = require('express');
const axios = require('axios');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

// Initialize Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Initialize Email
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Kill Rubrics
const killRubrics = {
  wmd: {
    minPrice: 10000000,
    maxPrice: 150000000,
    minUnits: 32,
    minNOI: 900000,
    minOccupancy: 0.80,
    minCapRate: 5,
    maxCapRate: 7,
    businessName: 'WMD'
  },
  ryan_stlouis: {
    minUnits: 2,
    maxUnits: 4,
    minARVSpread: 20000,
    businessName: 'Ryan (St. Louis BRRR)'
  },
  david_ross: {
    minUnits: 1,
    maxUnits: 5,
    minPrice: 100000,
    maxPrice: 550000,
    businessName: 'David Ross (NC Co-Living)'
  },
  bp_rvpark: {
    minPads: 20,
    maxPrice: 2000000,
    minCashflow: 12000,
    businessName: 'Breakaway Properties (RV Parks)'
  }
};

// Evaluate deal with Claude AI
async function evaluateDeal(dealData) {
  try {
    const prompt = `Evaluate this real estate deal:
Address: ${dealData.address}
Business Type: ${dealData.business_type}
Price: $${dealData.price}
Units/Pads: ${dealData.units}
NOI/Cashflow: $${dealData.noi}
Cap Rate/ARV Spread: ${dealData.cap_rate}%
Details: ${dealData.details || 'None'}

Kill Rubrics:
- WMD: $10M-$150M, 32+ units, NOI >$900K, 5-7% cap rate
- Ryan (St. Louis): 2-4 units, ARV spread >$20K
- David (NC): 1-5 units, $100K-$550K
- BP (RV): 20+ pads, <$2M, >$12K/month cashflow

Respond ONLY with JSON:
{
  "passes": boolean,
  "quality_score": number(0-100),
  "fee_potential": number,
  "summary": "brief explanation"
}`;

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-opus-4-1-20250805',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }]
    }, {
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const responseText = response.data.content[0].text;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const evaluation = JSON.parse(jsonMatch[0]);
    
    return evaluation;
  } catch (error) {
    console.error('Error evaluating deal:', error);
    return { passes: false, quality_score: 0, fee_potential: 0, summary: 'Error evaluating deal' };
  }
}

// Send SMS
async function sendSMS(message) {
  try {
    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: process.env.OWNER_PHONE
    });
  } catch (error) {
    console.error('SMS error:', error);
  }
}

// Send Email
async function sendEmail(subject, body) {
  try {
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: subject,
      html: body
    });
  } catch (error) {
    console.error('Email error:', error);
  }
}

// POST /api/deal - Submit a deal for evaluation
app.post('/api/deal', async (req, res) => {
  const dealData = req.body;
  const evaluation = await evaluateDeal(dealData);

  // Format results
  const smsMessage = `✅ ${killRubrics[dealData.business_type]?.businessName}: ${dealData.address} - Quality: ${evaluation.quality_score}/100 - Fee: $${Math.round(evaluation.fee_potential).toLocaleString()}`;
  
  const emailBody = `
    <h2>Deal Evaluation Results</h2>
    <p><strong>Address:</strong> ${dealData.address}</p>
    <p><strong>Business Type:</strong> ${dealData.business_type}</p>
    <p><strong>Decision:</strong> ${evaluation.passes ? '✅ PASS' : '❌ NO-GO'}</p>
    <p><strong>Quality Score:</strong> ${evaluation.quality_score}/100</p>
    <p><strong>Fee Potential:</strong> $${Math.round(evaluation.fee_potential).toLocaleString()}</p>
    <p><strong>Summary:</strong> ${evaluation.summary}</p>
  `;

  // Send notifications if deal passes
  if (evaluation.passes) {
    await sendSMS(smsMessage);
    await sendEmail(`Deal Alert: ${dealData.address}`, emailBody);
  }

  res.json(evaluation);
});

// GET /api/deals - Get all deals
app.get('/api/deals', (req, res) => {
  res.json([]);
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Deal VA is running', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Deal VA running on port ${PORT}`);
});
