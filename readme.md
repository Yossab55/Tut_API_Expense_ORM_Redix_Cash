# 💰 Expense Management REST API

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Yossab55/Tut_API_Expense_ORM_Redix_Cash)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](LICENSE)

A comprehensive RESTful API for tracking and managing expenses.  
Built with **Node.js, Express, MySQL**, and follows modern backend best practices.

---

## 🚀 Features

- **User Management**

  - Signup, login, and logout endpoints
  - JWT authentication with cookie-based session handling

- **Expense Management**

  - Full CRUD operations for expense records
  - Filtering by **date ranges** (today, custom period)
  - Grouping by **categories**

- **Database**

  - Normalized relational schema with foreign key relationships
  - Custom **MySQL stored procedures** for optimized queries

- **Security & Reliability**
  - Authentication middleware for route protection
  - Centralized error handling with custom error classes
  - Schema-based input validation

---

## 🛠️ Tech Stack

| Layer          | Technology    |
| -------------- | ------------- |
| Runtime        | Node.js       |
| Framework      | Express.js    |
| Database       | MySQL         |
| Authentication | JWT + Cookies |
| Architecture   | MVC pattern   |

---

## 🔑 API Endpoints

### Auth

- `POST /signup` → Register a new user
- `POST /login` → Login with email & password
- `POST /logout` → Logout user
### User

- `PATCH /user` → Update an user
- `DELETE /user` → delete your account

### Expenses

- `GET /expenses` → Get all expenses (with filtering & grouping)
- `POST /expenses` → Add new expense
- `PATCH /expenses/:id` → Update an expense
- `DELETE /expenses/:id` → Delete an expense

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/Yossab55/Tut_API_Expenses.git
cd expense-api

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env   # update DB credentials, JWT secret, etc.

# Run database schema
mysql -u root -p < dbSchema.sql

# Start development server
npm run dev
```

## 🧪 Testing the API

Use Postman, APIDog or `curl` to interact with the endpoints.

```batch
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email":"user@example.com","password":"secret"}'
```

## 🏗️ Architecture Highlights

Separation of concerns (Controllers / Models / Middleware)

Reusable database manager & auth utilities

RESTful design with standard status codes & JSON responses

Scalable and maintainable codebase

## 📧 Contact

LinkedIn: [Yossab Samouel](https://www.linkedin.com/in/yossab-samouel5/)

Email:yossabsamouelwork@gmail.com

🔥 This project demonstrates proficiency in backend API development, relational database design, authentication, and modern Node.js ecosystem.

Project link: [roadmap.sh link](https://roadmap.sh/projects/expense-tracker-api)
