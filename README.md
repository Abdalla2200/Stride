# STRIDE

DETAILS MAKE THE MAN

A full-cycle men's fashion e-commerce storefront built as a portfolio project — covering product browsing, cart, authentication, checkout, and order history end-to-end.

🚧 **Status:** In active development

## Overview

STRIDE is a men's fashion storefront covering four categories — shirts, shoes, watches, and sunglasses — sourced from the DummyJSON API. The project demonstrates a complete e-commerce flow: browsing products, managing a cart, signing up and signing in, checking out, and reviewing past orders.

This is a learning-by-building project — features like authentication are implemented just-in-time as the build progresses, rather than fully planned out in advance.

## Tech Stack

| Layer            | Choice                                 |
| :--------------- | :------------------------------------- |
| Framework        | Next.js (App Router) \+ TypeScript     |
| Styling          | Tailwind CSS                           |
| State management | Zustand                                |
| Auth & Database  | Supabase (Auth \+ Postgres)            |
| Validation       | Zod                                    |
| Icons            | Lucide                                 |
| Product data     | [DummyJSON](https://dummyjson.com) API |

## Progress

- [x] Project scaffolding (Next.js \+ TypeScript \+ Tailwind)
- [x] Landing page — Navbar, Hero, category grid, newsletter signup, Footer

## Getting Started

git clone \<https://github.com/Abdalla2200/Stride\>

cd stride

npm install

npm run dev

Then open [http://localhost:3000](http://localhost:3000).

Environment variables (Supabase keys) will be documented here once auth is wired up.

## Notes on Data

Product data comes from the public [DummyJSON](https://dummyjson.com) API across four categories: `mens-shirts`, `mens-shoes`, `mens-watches`, and `sunglasses`. Cart, checkout, and payment actions are simulated for demonstration purposes — nothing writes back to a real backend or processes real payments.

## Design

UI designed in Google Stitch, covering Home, Category Listing, Product Detail, Cart, Sign Up, Sign In, Checkout, and Order Confirmation screens.

---

_This README is updated as each part of the project is completed._
