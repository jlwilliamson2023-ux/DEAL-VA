# Quick Start Guide

## Local Testing

```bash
npm install
npm start
```

Server runs on http://localhost:3000

## Submit a Test Deal

```bash
curl -X POST http://localhost:3000/api/deal \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Oak Ave, Dallas, TX",
    "business_type": "wmd",
    "price": 25000000,
    "units": 50,
    "noi": 1200000,
    "cap_rate": 6.5,
    "details": "Class A, stabilized"
  }'
```

## Deployment on Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Environment Variables

```
ANTHROPIC_API_KEY=your_key
EMAIL_USER=your_email
EMAIL_PASS=your_gmail_app_password
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE=your_twilio_number
OWNER_EMAIL=your_email
OWNER_PHONE=your_phone
PORT=3000
NODE_ENV=production
```

## Integrate with Zapier

1. Create webhook in Zapier
2. Point to: `https://landon-deal-va.onrender.com/api/deal`
3. Map form fields to JSON body
4. Trigger on new form submission

## Troubleshooting

**No SMS sending?**
- Check Twilio account has phone number verified
- Verify TWILIO_PHONE is in E.164 format (+1234567890)

**No emails?**
- Verify Gmail app password (not regular password)
- Check EMAIL_USER matches the Gmail account
- Gmail may require less secure app access enabled

**Deal not evaluating?**
- Check ANTHROPIC_API_KEY is valid
- Verify Claude API is accessible from Render
- Check logs in Render dashboard

## Support

Email: jlwilliamson2023@gmail.com
Phone: +1 (769) 770-3261
