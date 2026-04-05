# Expense Tracker API

A Node.js & Express based RESTful API for tracking incomes and expenses with built-in Role-Based Access Control (RBAC). The project uses MongoDB (via Mongoose) to store users and financial records, and leverages JWT for secure authentication.

## ✨ Features

- **Role-Based Access Control (RBAC):** Users can have different roles (`admin`, `analyst`, `user`), each with specific permissions to access different routes.
- **JWT Authentication:** Secure user authentication using JSON Web Tokens. Tokens are securely stored in HTTP cookies.
- **Password Encryption:** Passwords are hashed and validated using `bcryptjs`.
- **Expense & Income Tracking:** Full CRUD functionalities for financial transactions, storing amounts, categories, and types.
- **Data Filtering:** Get transaction arrays filtered by custom query parameters.
- **Dashboard Analytics:** MongoDB aggregation pipelines generate instant financial summaries mapping total income, total expenses, and current balances.

---

## 🛠️ Tech Stack
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB, Mongoose SDK
- **Authentication:** jsonwebtoken, cookie-parser
- **Security:** bcryptjs, dotenv (environmental variables)

---

## 📂 Models

### 1. **User**
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)
- `role` (String: e.g., 'admin', 'analyst', 'user')

### 2. **Expense**
- `amount` (Number)
- `type` (String: enum of 'income' or 'expense')
- `category` (String)
- `date` (Date)
- `note` (String)
- `createdBy` (ObjectId referencing User)

---

## 🚀 API Routes

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Authenticate user & get token cookie | Public |

### Role-Secured Records & Dashboard (`/api/access`)

*Note: The following routes require a valid JWT token cookie.*

| Method | Endpoint | Description | Permitted Roles |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/access/records/create` | Create a new financial record | `admin` |
| **POST** | `/api/access/records/update/:id` | Update an existing record | `admin` |
| **POST** | `/api/access/records/delete/:id` | Delete a financial record | `admin` |
| **GET** | `/api/access/records` | Fetch filterable records *(`?type=` & `?category=`)* | `admin`, `analyst` |
| **GET** | `/api/access/dashboard/summary`| Get calculated income, expense, & balance | `admin`, `analyst`, `user` |

---

## 💻 Local Setup

1. **Clone the repository** (if not already local).
2. **Install dependencies:**  
   `npm install`
3. **Configure Environment Variables:** Create a `.env` file in the root directory providing:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```
4. **Run the Development Server:**  
   `npm run dev`

The server will start locally, currently configured by default on port `3000`.
