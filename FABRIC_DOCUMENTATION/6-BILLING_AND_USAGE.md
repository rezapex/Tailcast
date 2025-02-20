# Billing and Usage Documentation

## Overview
AutomateTube implements a tiered billing system using Stripe for payment processing and Railway for service deployment. This document outlines the billing structure, usage limits, and technical implementation details.

## Subscription Tiers

### Free Tier
- **Daily Limit:** 5 analyses per day
- **Features:**
  - Basic analysis patterns
  - 7-day history retention
  - Standard support
- **Price:** Free

### Plus Tier
- **Daily Limit:** 25 analyses per day
- **Features:**
  - All analysis patterns
  - 30-day history retention
  - Email support
  - Priority processing
- **Price:** $19.99/month
- **Stripe Price ID:** `${STRIPE_PRICE_PLUS}`

### Pro Tier
- **Daily Limit:** Unlimited analyses
- **Features:**
  - All analysis patterns
  - Unlimited history retention
  - Priority support
  - Advanced analytics
- **Price:** $29.99/month
- **Stripe Price ID:** `${STRIPE_PRICE_PRO}`

### Enterprise Tier
- **Daily Limit:** Unlimited analyses
- **Features:**
  - Everything in Pro
  - Custom patterns
  - API access
  - Dedicated support
  - Custom integrations
- **Price:** $299.00/month
- **Stripe Price ID:** `${STRIPE_PRICE_ENTERPRISE}`

## Technical Implementation

### Environment Variables
```toml
# Stripe Configuration
STRIPE_SECRET_KEY = "${STRIPE_SECRET_KEY}"
STRIPE_WEBHOOK_SECRET = "${STRIPE_WEBHOOK_SECRET}"
STRIPE_PRICE_PLUS = "${STRIPE_PRICE_PLUS}"
STRIPE_PRICE_PRO = "${STRIPE_PRICE_PRO}"
STRIPE_PRICE_ENTERPRISE = "${STRIPE_PRICE_ENTERPRISE}"

# Usage Limits
FREE_TIER_DAILY_LIMIT = "${FREE_TIER_DAILY_LIMIT}"
PLUS_TIER_DAILY_LIMIT = "${PLUS_TIER_DAILY_LIMIT}"
PRO_TIER_DAILY_LIMIT = "${PRO_TIER_DAILY_LIMIT}"
ENTERPRISE_TIER_DAILY_LIMIT = "${ENTERPRISE_TIER_DAILY_LIMIT}"
```

### API Endpoints

#### 1. Check Subscription Status
```http
GET /api/billing/subscription
Authorization: Bearer <token>
```
Response:
```json
{
  "plan": "plus",
  "status": "active",
  "current_period_end": "2024-03-01T00:00:00Z",
  "usage": {
    "current": 10,
    "limit": 25,
    "reset_at": "2024-02-02T00:00:00Z"
  }
}
```

#### 2. Create Subscription
```http
POST /api/billing/subscribe
Authorization: Bearer <token>
Content-Type: application/json

{
  "plan_id": "plus",
  "payment_method_id": "pm_..."
}
```
Response:
```json
{
  "subscription_id": "sub_...",
  "client_secret": "pi_..._secret_...",
  "status": "active"
}
```

#### 3. Cancel Subscription
```http
POST /api/billing/cancel
Authorization: Bearer <token>
```
Response:
```json
{
  "status": "cancelled",
  "effective_date": "2024-03-01T00:00:00Z"
}
```

#### 4. Update Subscription
```http
POST /api/billing/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "plan_id": "pro"
}
```
Response:
```json
{
  "status": "updated",
  "new_plan": "pro",
  "effective_date": "2024-02-01T00:00:00Z"
}
```

### Usage Tracking

Usage is tracked through Supabase with the following schema:

```sql
CREATE TABLE usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    request_type TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    plan_id TEXT NOT NULL,
    stripe_subscription_id TEXT,
    stripe_customer_id TEXT,
    status TEXT NOT NULL,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Client Implementation

The Chrome extension implements billing through the following services:

1. `BillingService`: Manages subscription state and usage tracking
2. `APIService`: Handles API communication with the backend
3. `DatabaseService`: Manages local storage and Supabase sync

Key features:
- Automatic usage tracking
- Daily limit enforcement
- Subscription status caching
- Offline support
- Automatic sync with backend

### Webhook Handling

Stripe webhooks are handled for the following events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

### Error Handling

The system implements comprehensive error handling for:
- Payment failures
- Usage limit exceeded
- Network errors
- Authentication errors
- Subscription state conflicts

## Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Token refresh mechanism
   - Secure storage of credentials

2. **Payment Processing**
   - PCI-compliant Stripe integration
   - Secure webhook verification
   - Encrypted payment method storage

3. **Usage Protection**
   - Rate limiting
   - Usage quotas
   - Abuse prevention

## Development and Testing

### Local Testing
1. Use Stripe CLI for webhook testing:
```bash
stripe listen --forward-to localhost:8080/webhook
```

2. Set up test environment:
```bash
export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_WEBHOOK_SECRET=whsec_...
```

### Production Deployment
1. Configure Railway environment variables
2. Set up Stripe webhook endpoints
3. Configure Supabase production credentials

## Troubleshooting

Common issues and solutions:

1. **Usage Limit Issues**
   - Check daily reset timing
   - Verify subscription status
   - Check usage logs

2. **Payment Problems**
   - Verify Stripe configuration
   - Check webhook logs
   - Validate payment method

3. **Sync Issues**
   - Check network connectivity
   - Verify Supabase connection
   - Check local storage state

## Support and Contact

For billing support:
- Email: support@automatehub.net
- Documentation: https://automatehub.net/docs
- API Status: https://status.automatehub.net 