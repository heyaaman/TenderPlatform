# 🧾 Tender Management Platform

A full-stack web application for managing company profiles and tenders. Built as part of an internship project with complete authentication, tender posting, proposal applications, and company search features.

---

## 🚀 Features

### 🔐 Authentication
- Signup & Login using JWT
- Auto login after signup
- Token-protected backend routes

### 🏢 Company Management
- Create & update company profile
- Upload company logo
- One company per user

### 📢 Tenders
- Create tenders (protected)
- View your tenders
- View all tenders
- Submit proposals

### 📄 Applications
- Apply to tenders with proposals
- Company can view received applications

### 🔍 Company Search
- Search companies by name or industry

---

## 🛠 Tech Stack

| Layer     | Tech Used                                    |
|-----------|----------------------------------------------|
| Frontend  | **Next.js 15**, React 19, TypeScript, MUI 7  |
| Backend   | **Express.js**, Node.js, Knex.js             |
| Auth      | JWT (JSON Web Tokens)                        |
| Database  | PostgreSQL                                   |
| Styling   | MUI + Tailwind (optional utility use)        |
| Client    | Axios                                        |

---

## 📁 Project Structure

### 📦 Backend (`TenderPlatform-backend`)
index.js
/db.js
/.env
/routes/
├── auth.js
├── company.js
├── tender.js
└── application.js
/controllers/
├── authController.js
├── companyController.js
├── tenderController.js
└── applicationController.js
/middlewares/
└── auth.js


### 💻 Frontend (`frontend`)
/pages/
├── index.tsx
├── login.tsx
├── signup.tsx
├── dashboard.tsx
├── create-tender.tsx
├── my-tenders.tsx
├── tenders.tsx
├── applications.tsx
├── company-search.tsx
└── company-profile.tsx
/components/
└── CompanyProfile.tsx


---

## ⚙️ Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone https://github.com/<your-username>/tender-platform.git
cd TenderPlatform-backend
npm install

cd ../frontend
npm install
