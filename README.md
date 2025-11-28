# 🛍️ Shopify – Full-Stack E-Commerce App (Next.js + TypeScript)

Live Demo: **https://shopify.irfans.dev**

Shopify is a full-stack e-commerce platform built with **Next.js**, **TypeScript**, and **MongoDB**.  
Users can **create accounts, verify emails, log in via Google or credentials, post products, manage listings, and update their profile** — all in one secure, scalable system.

The app uses **NextAuth** for authentication, **Mongoose** for database modeling, and **React Email + Nodemailer** for sending verification codes.

---

## 🚀 Features

### 🔐 Authentication (NextAuth)

- **Email + Password Login**
- **Google OAuth Login**
- **User Sign-Up with Email Verification (code sent via email)**
- **Google accounts are auto-verified**
- **Protected routes with token-based security (proxy layer + server validation)**

### 🛍️ Product Management

- Add new products
- Edit & manage posted products
- View user-specific products
- Product includes: title, price, description, category, images, rating

### ⭐ Additional Features

- MongoDB database with Mongoose models
- Secure password hashing using **bcrypt.js**
- Email verification using **React Email + Nodemailer**
- Fully typed codebase (TypeScript)
- Responsive UI
- Server + client rendered pages
- Dashboard routes protected by NextAuth session tokens

---

## 📦 Tech Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Frontend      | Next.js 16 (TypeScript), React 19, TailwindCSS    |
| Backend       | Next.js API Routes (TypeScript)                   |
| Database      | MongoDB + Mongoose                                |
| Auth          | NextAuth (Google Provider + Credentials Provider) |
| Email Service | React Email + Nodemailer                          |
| Others        | Axios, Zod, bcryptjs, AOS animations, React Icons |

---

## 🗂️ Environment Variables

Follow the `.env.sample` file.  
Required environment variables include:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 🛠️ Setup & Installation

Follow the steps below to run the Shopify (Ecommerce App) project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopify.git
cd shopify
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## 3. Configure Environment Variables

`Create a new .env file based on .env.sample:`

```env

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

MONGODB_URI=

JWT_ACCESS_TOKEN_SECRET_KEY=
JWT_REFRESH_TOKEN_SECRET_KEY=

JWT_ACCESS_TOKEN_EXPIRE=
JWT_REFRESH_TOKEN_EXPIRE=

NEXT_PUBLIC_BASE_URL=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

```

## 4. Run the Development Server

```bash
npm run dev

```

- Your app will be available at: `http://localhost:3000`

## 5. Build for Production (Optional)

```bash

npm run build
npm start

```
