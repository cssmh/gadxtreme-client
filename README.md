# GadXtreme - Gadget E-commerce Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Live Demo

- [GadXtreme on Firebase](https://gadxtreme-906da.web.app)
- [GadXtreme on Firebase](https://gadxtreme.vercel.app)

### Admin Dashboard Preview

![Admin Dashboard](./src/assets/admin_dashboard_preview.png)
_Screenshot showcasing the Admin Dashboard with product and order management features._

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Packages Used](#packages-used)
- [Upcoming Features](#upcoming-features)

## Description

**GadXtreme** is an advanced e-commerce platform tailored for gadget enthusiasts. It allows users to browse and purchase a wide range of gadgets, manage their orders, and perform secure payments (Stripe integration coming soon). Admins have the ability to manage products, orders, and users through a powerful admin dashboard.

## Features

1. **User Authentication:**
   - Secure sign up and login (Google authentication included).
   - Profile updates and password management.
   - Role-based access (User/Admin).
2. **Product Management:**

   - Browse products by category (e.g., smartwatches, headphones).
   - Add and remove products from the cart.
   - Real-time cart updates and order placement.

3. **Admin Capabilities:**
   - Add, update, and delete products.
   - Manage orders (view, update status, delete).
   - User management (upgrade to admin, view activity).
4. **Order Management:**
   - Track order history and status (Pending, Shipped, Delivered).
   - Admins can update and manage orders.
5. **Responsive Design:**
   - Fully responsive across devices (mobile, tablet, and desktop).
   - Interactive animations using **AOS** and **Swiper** for product carousels.
6. **Upcoming Stripe Integration:**
   - **Stripe.js** will be added for secure payments and transaction tracking.

## Packages Used

### Dependencies

- [firebase](https://www.npmjs.com/package/firebase) - Authentication and hosting.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - For routing.
- [axios](https://www.npmjs.com/package/axios) - HTTP requests.
- [swiper](https://www.npmjs.com/package/swiper) - Product image carousels.
- [react-icons](https://www.npmjs.com/package/react-icons) - Iconography for UI elements.
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query) - Data fetching and caching.
- [sonner](https://www.npmjs.com/package/sonner) - Notifications.

### Dev Dependencies

- [daisyui](https://daisyui.com/docs/install) - Pre-styled Tailwind CSS components.
- [tailwindcss](https://tailwindcss.com/docs/guides/vite) - Utility-first styling.
- [vite](https://vitejs.dev/) - Build tool for fast development and production.

## Upcoming Features

- **Stripe Integration:** Full payment support using Stripe.js for secure transactions.
- **Product Reviews & Ratings:** Users can leave reviews and ratings for purchased gadgets.
- **Wishlist Feature:** Save products for later with a wishlist functionality.
- **Advanced Admin Analytics:** Detailed sales, user, and product analytics for admins.
