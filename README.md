# Landon's Autonomous Deal VA

**Real estate deal sourcing, evaluation, and notification system.**

## What It Does

- Receives deal submissions
- Evaluates against your buybox criteria
- Sends SMS + Email alerts for qualified deals
- Calculates fee potential
- Ranks deals by quality

## Built With

- Node.js / Express
- Claude AI (deal evaluation)
- Twilio (SMS notifications)
- Gmail (email notifications)

## Your Business Buybox

### WMD Platinum Properties
- **Target:** $10M-$150M multifamily
- **Units:** 32+
- **NOI:** >$900K
- **Cap Rate:** 5-7%
- **Fee:** 3% of purchase price

### Ryan - St. Louis BRRR
- **Target:** 2-4 unit properties
- **ARV Spread:** >$20K
- **Fee:** $1K+ per deal

### David Ross - NC Co-Living
- **Target:** 1-5 units, $100K-$550K
- **Fee:** TBD with David
- **Market:** North Carolina

### Breakaway Properties - RV Parks
- **Target:** 20+ pad RV parks
- **Price:** <$2M
- **Cashflow:** >$12K/month
- **Fee:** Equity partner

## Deployment

Deployed on Render.com

**Live URL:** https://landon-deal-va.onrender.com

## API Endpoints

**POST /api/deal** - Submit a deal
```json
{
  "address": "123 Main St, Dallas, TX",
  "business_type": "wmd",
  "price": 25000000,
  "units": 50,
  "noi": 1200000,
  "cap_rate": 6.5,
  "details": "Class A, fully leased, stabilized"
}
```

**GET /api/deals** - Retrieve all evaluated deals

## Notifications

- ✅ SMS alerts for qualified deals
- ✅ Email with full analysis
- ✅ Quality scores and fee potential
- ✅ Daily digest (optional)

## Support

Contact: Landon
Phone: +1 (769) 770-3261
Email: jlwilliamson2023@gmail.com
