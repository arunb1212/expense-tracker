# Expense Tracker API Documentation

Base URL: `http://localhost:3000/api`

## Authentication API (`/auth`)

### 1. Register a new user
Registers a new user and returns a JWT token via cookies.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Required Body Data:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "strongPassword123",
    "role": "admin" // Can be: 'admin', 'analyst', 'user'
  }
  ```
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:** `{ "message": "user created successfully", "newuser": { ... } }`
- **Error Response:**
  - **Code:** `400 Bad Request`
  - **Content:** `{ "message": "all fields are required" }` AND `{ "message": "user already exists" }`

### 2. Login
Authenticates an existing user and returns a JWT token via cookies.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Required Body Data:**
  ```json
  {
    "email": "john@example.com",
    "password": "strongPassword123"
  }
  ```
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ "message": "welcome back John Doe" }`
- **Error Response:**
  - **Code:** `400 Bad Request`
  - **Content:** `{ "message": "user not found" }` OR `{ "message": "invalid credentials" }`

---

## Role-Secured Records API (`/access`)

*Note: All endpoints below strictly require a valid JWT `token` in the HTTP Request Cookies. Additionally, user roles are checked during authorization.*

### 3. Create a Financial Record
- **URL:** `/access/records/create`
- **Method:** `POST`
- **Required Role:** `admin`
- **Required Body Data:**
  ```json
  {
    "date": "2023-10-15T00:00:00.000Z",
    "amount": 150.50,
    "type": "expense", // 'income' or 'expense'
    "category": "Groceries",
    "note": "Optional description string"
  }
  ```
- **Success Response:**
  - **Code:** `201 Created`
  - **Content:** `{ "message": "Record created", "record": { ... } }`

### 4. Update a Record
- **URL:** `/access/records/update/:id`
- **Method:** `POST`
- **Required Role:** `admin`
- **Dynamic URL Params:** `id=[ObjectId]`
- **Optional Body Data:** Any field from the record to be altered (e.g., `amount`, `category`, `type`).
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ ...updatedRecordObject }`
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:** `{ "message": "Record not found" }`

### 5. Delete a Record
- **URL:** `/access/records/delete/:id`
- **Method:** `POST`
- **Required Role:** `admin`
- **Dynamic URL Params:** `id=[ObjectId]`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ "message": "Record deleted successfully" }`
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:** `{ "message": "Record not found" }`

### 6. Get/Filter Records
Retrieves all records or filtered records matching standard URL query parameters.

- **URL:** `/access/records`
- **Method:** `GET`
- **Required Role:** `admin`, `analyst`
- **Optional URL Query Params:** 
  - `?type=` (e.g. `?type=income`)
  - `?category=` (e.g. `?category=Groceries`)
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ "message": "Records fetched successfully", "records": [ ... ] }`
- **Error Response:**
  - **Code:** `404 Not Found`
  - **Content:** `{ "message": "No records found" }`

### 7. Dashboard Summary Analytics
Calculates aggregated lifetime earnings, operational expenses, and total remaining balance via MongoDB Aggregation Pipelines directly.

- **URL:** `/access/dashboard/summary`
- **Method:** `GET`
- **Required Role:** `admin`, `analyst`, `user`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:**
    ```json
    {
      "message": "Summary fetched successfully",
      "summary": {
        "totalIncome": 5000,
        "totalExpense": 1250.50,
        "balance": 3749.50
      }
    }
    ```
