# STRIDE

> DETAILS MAKE THE MAN

A full-cycle men's fashion e-commerce storefront built as a portfolio project — covering product browsing, cart, authentication, checkout, and order history end-to-end.

🚧 **Status:** In active development

## Overview

STRIDE is a men's fashion storefront covering four categories — shirts, shoes, watches, and sunglasses — sourced from the DummyJSON API. The project demonstrates a complete e-commerce flow: browsing products, managing a cart, signing up and signing in, checking out, and reviewing past orders.

This is a learning-by-building project — features like authentication are implemented just-in-time as the build progresses, rather than fully planned out in advance.

## Tech Stack

| Layer            | Choice                                 |
| :--------------- | :-------------------------------------- |
| Framework        | Next.js (App Router) + TypeScript      |
| Styling          | Tailwind CSS                           |
| State management | Zustand                                |
| Auth & Database  | Supabase (Auth + Postgres)             |
| Validation       | Zod                                    |
| Icons            | Lucide                                 |
| Product data     | [DummyJSON](https://dummyjson.com) API |

## Progress

- [x] Project scaffolding (Next.js + TypeScript + Tailwind)
- [x] Landing page — Navbar, Hero, category grid, newsletter signup, Footer
- [x] Category listing pages (statically generated)
- [x] Product detail pages (statically generated)
- [x] Global loading, error, and not-found handling, plus route-level skeleton loaders
- [x] Cart (Zustand, scoped to the authenticated user)
- [x] Authentication (Supabase Auth: sign up, sign in, sessions, Google OAuth)
- [ ] Checkout flow
- [ ] Simulated payment
- [ ] Order history

## Getting Started

```bash
git clone https://github.com/Abdalla2200/Stride
cd stride
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

(Add any additional keys your Supabase client setup requires, e.g. Google OAuth redirect config.)

## Notes on Data & Rendering

Product data comes from the public [DummyJSON](https://dummyjson.com) API across four categories: `mens-shirts`, `mens-shoes`, `mens-watches`, and `sunglasses`. Since this catalog is fixed and outside my control, category and product detail pages are statically generated at build time (`generateStaticParams` + `cache: 'force-cache'`) instead of fetched per request. Product images and data are placeholder-quality from a free public API — the focus here is the storefront logic and UX, not the catalog itself, since the real use case is selling this storefront as a template for others to plug in their own products. Checkout and payment actions are simulated for demonstration purposes — nothing processes real payments.

## Design

UI designed in Google Stitch, covering Home, Category Listing, Product Detail, Cart, Sign Up, Sign In, Checkout, and Order Confirmation screens.

---

*This README is updated as each part of the project is completed.*