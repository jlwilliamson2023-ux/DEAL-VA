# Deployment Guide

## Files Included

- `index.js` - Main Express server
- `package.json` - Dependencies
- `.env` - Environment variables
- `README.md` - Documentation
- `QUICKSTART.md` - Quick start guide
- `DEPLOYMENT.md` - This file

## Step 1: Prepare GitHub

1. Create GitHub repository: `landon-deal-va`
2. Push all files to GitHub
3. Make sure .env is included (has your credentials)

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with email

## Step 3: Deploy

1. Click "New" → "Web Service"
2. Connect GitHub repository
3. Fill in:
   - **Name:** `landon-deal-va`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

## Step 4: Environment Variables

Add these 10 variables in Render:

```
ANTHROPIC_API_KEY = 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

EMAIL_USER = jlwilliamson2023@gmail.com

EMAIL_PASS = ljkg ovsm hmno irfj

TWILIO_ACCOUNT_SID = AC7f1e685a6e073222222696cc7c5d0eab

TWILIO_AUTH_TOKEN = 42e82c77c74979f8a775473f7f587a76

TWILIO_PHONE = +14155552671

OWNER_EMAIL = jlwilliamson2023@gmail.com

OWNER_PHONE = +17697703261

PORT = 3000

NODE_ENV = production
```

## Step 5: Deploy

Click "Deploy Web Service"

Wait 2-3 minutes for deployment to complete.

You'll see a green checkmark when live.

## Step 6: Get Your URL

Once deployed, you get a URL like:

`https://landon-deal-va.onrender.com`

## Step 7: Test It

Open this in browser:
```
https://landon-deal-va.onrender.com
```

You should see: `{"status": "Deal VA is running"}`

## Step 8: Connect to Zapier (Optional)

Use this webhook URL in Zapier:
```
https://landon-deal-va.onrender.com/api/deal
```

Map your form fields to JSON:
- address
- business_type
- price
- units
- noi
- cap_rate
- details

## Monitoring

- View logs in Render dashboard
- Check SMS delivery in Twilio console
- Check email delivery in Gmail sent folder

## Troubleshooting

**Deployment fails?**
- Check GitHub repo has all files
- Verify package.json is correct
- Check environment variables are set

**Service won't start?**
- Check logs in Render dashboard
- Verify environment variables
- Check Node version (18.x required)

**No notifications sent?**
- Check Twilio credentials
- Verify Gmail app password
- Check OWNER_PHONE format: +17697703261

## Costs

- **Render Free Tier:** Free (may spin down after inactivity)
- **Twilio:** Pay-as-you-go SMS ($0.0075 per SMS)
- **Gmail:** Free
- **Claude API:** Pay-per-token

Total monthly: ~$50-100 depending on volume

## Support

Need help? Email: jlwilliamson2023@gmail.com
