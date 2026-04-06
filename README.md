# 💰 Finance Dashboard Backend API

A scalable backend API for managing personal financial records with secure authentication, role-based access control, and analytical dashboards.

Built using **Node.js**, **Express**, and **MongoDB (Mongoose)**, this project follows real-world backend practices including structured APIs, validation, and aggregation-based analytics.

---

## 🚀 Tech Stack

- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (stored in cookies)  
- **Architecture:** REST API  

---

## ✨ Features

- JWT-based authentication using HTTP-only cookies  
- Role-Based Access Control (**Admin / User**)  
- User management (email, password, role, status updates)  
- Finance records CRUD operations  
- Pagination and filtering support  
- Dashboard analytics using MongoDB aggregation  
- Ownership-based access using `/users/me` pattern  

---

## 📁 API Endpoints

### 🔐 Auth

- `POST /api/auth/register` – Register user  
- `POST /api/auth/login` – Login  
- `GET /api/auth/logout` – Logout  

---

### 👤 Users

- `GET /api/users` – Get all users (pagination + filters: `page`, `limit`, `status`, `role`)  
- `GET /api/users/me` – Get current user  
- `GET /api/users/:id` – Get user by ID  
- `PATCH /api/users/me/email` – Update email  
- `PATCH /api/users/me/status` – Update status  
- `PATCH /api/users/me/password` – Update password  
- `PATCH /api/users/:id/role` – Update role (Admin)  
- `DELETE /api/users/me/delete` – Delete account  

---

### 💵 Finance

- `POST /api/users/me/finances` – Create finance record  
- `GET /api/users/me/finances` – Get records (pagination + filters)  
- `PATCH /api/users/me/finances/:id/amount` – Update amount  
- `PATCH /api/users/me/finances/:id/recordtype` – Update type  
- `PATCH /api/users/me/finances/:id/category` – Update category  
- `PATCH /api/users/me/finances/:id/desc` – Update description  
- `DELETE /api/users/me/finances/:id` – Delete record  

---

### 📊 Dashboard

- `GET /api/users/:id/dashboard` – Individual user dashboard  
- `GET /api/users/dashboard` – System-wide dashboard  


## 🧠 Design Decisions

### 1. Ownership-Based Access (`/users/me`)

Instead of relying on client-provided user IDs, the API derives the user from authentication context.
This prevents unauthorized access and simplifies client-side usage.

---

### 2. Granular PATCH Endpoints

Each field update is handled via separate endpoints (e.g., `/amount`, `/category`):

* Improves validation precision
* Avoids unintended bulk updates
* Makes API intent explicit

---

### 3. JWT Stored in Cookies

Authentication tokens are stored in HTTP-only cookies:

* Reduces exposure to XSS attacks
* Simplifies session handling on the client

---

### 4. Role-Based Access Control (RBAC)

System enforces role separation:

* **Admin** → manage users
* **User** → manage own financial data

---

### 5. Pagination & Filtering Strategy

All list endpoints support:

* Pagination (`page`, `limit`)
* Query-based filtering

This ensures:

* Scalable data handling
* Controlled payload sizes

---

### 6. Aggregation-Based Dashboard

Dashboard endpoints use MongoDB aggregation:

* Efficient computation at database level
* Reduced processing overhead in application layer

---

### 7. Validation Layer Separation

Request validation is handled independently from business logic:

* Improves maintainability
* Keeps controllers clean
* Ensures consistent request contracts

---

## ⚠️ Assumptions

* Authentication middleware extracts user from JWT cookie
* Enums (roles, categories, types) are predefined
* Finance records belong strictly to one user
* Hard delete strategy is used (no soft delete)

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd <project-folder>
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file:

```env
PORT=3006
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run Server

```bash
npm run start-dev
```

---

## 📘 API Documentation

Swagger UI available at:

```
/api/docs
```

---

## 🏁 Summary

This backend demonstrates structured API design with strong emphasis on security, scalability, and maintainability. It reflects real-world backend engineering practices and is suitable for production-level learning and portfolio use.

---

