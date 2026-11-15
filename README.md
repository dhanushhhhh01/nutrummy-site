# NUTRUMMY · 3D Lupin Superfood Site

A React + Three.js storefront for NUTRUMMY high-protein lupin breakfasts: 3D product scenes, a working cart, and the NutriBot assistant.

**Live demo:** https://dhanushhhhh01.github.io/nutrummy-site/

## Features

- **3D scenes** built in code with React Three Fiber: a cereal bowl with a branded pouch, a rotating product pouch, ingredient spheres and floating grains. No model files to download.
- **Cart:** pack sizes, quantities, the `SEVEN15` coupon (15% off), free shipping over ₹499, and it's saved between visits. Checkout validates the delivery details and emails the order (no online payment yet).
- **NutriBot:** a client-side assistant for product, nutrition, shipping and bulk-order questions, with add-to-cart suggestions.
- **Sections:** story, products with category filters, brand values, daily timeline, ingredients, nutrition comparison, recipes, partner enquiries, contact, newsletter.
- Accessible colours (WCAG AA) and a responsive layout from phone to desktop.

## Run it locally

Needs Node.js 18+.

```bash
npm install --legacy-peer-deps
npm run dev
```

Then open http://localhost:5173.

`--legacy-peer-deps` is needed because `react-tilt` declares an old React peer version.

## Build

```bash
npm run build         # production build in dist/
npm run preview       # serve dist/ locally
npm run build:pages   # build for GitHub Pages (/nutrummy-site/) in dist-pages/
```

## Where things live

| What | Where |
|---|---|
| Products, prices, copy, coupons | `src/constants/index.js` |
| Colours and fonts | `tailwind.config.cjs`, `src/index.css` |
| Cart logic | `src/context/CartContext.jsx`, `src/components/CartDrawer.jsx` |
| NutriBot answers | `src/components/Chatbot.jsx` (`reply()`) |
| 3D scenes | `src/components/canvas/` |

## Optional: send the contact form directly

Without keys the contact form opens the visitor's email app. To send through [EmailJS](https://www.emailjs.com/), add a `.env` file:

```
VITE_APP_EMAILJS_SERVICE_ID=...
VITE_APP_EMAILJS_TEMPLATE_ID=...
VITE_APP_EMAILJS_PUBLIC_KEY=...
```

## Credits

Started from Adrian Hajdu's [3D developer portfolio](https://github.com/adrianhajdin/project_3D_developer_portfolio) template (JavaScript Mastery) and rebuilt for NUTRUMMY.
