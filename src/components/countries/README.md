# Country-Specific Components

This folder contains country-specific components for different markets.

## Structure

```
countries/
  ├── ca/          # Canada-specific components
  │   └── Home.tsx # Canada home page
  ├── uk/          # UK / EU components
  │   └── Home.tsx
  └── au/          # Australia components
      └── Home.tsx
```

## How It Works

- **Default components** are in `/src/components/` (e.g., `heroSection/`, `homePagePricingPlans/`)
- **Country-specific components** are in `/src/components/countries/{country-code}/`
- Each country has its own `Home.tsx` that composes the page using shared or country-specific components
- Routes like `/en-ca` use the Canada-specific Home component

## Adding a New Country

1. Create a new folder: `/src/components/countries/{country-code}/`
2. Create `Home.tsx` that imports and composes components
3. Add routes in `/app/{locale}/` (e.g., `/app/en-uk/`)
4. Update middleware to detect and redirect to the new locale

## Current Countries

- **CA (Canada)**: `/en-ca` routes → uses `countries/ca/Home.tsx`
- **UK / EU**: `/en-gb` routes → uses `countries/uk/Home.tsx`
- **AU (Australia)**: `/en-au` routes → uses `countries/au/Home.tsx` (priced in USD, shown as US$)
- **Default (US)**: `/` routes → uses `flashFireHome.tsx`

