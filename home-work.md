# **ITINFO Project Documentation**

---

## **Project Overview**

**ITINFO** is an information management system designed to handle various entities such as Users, Admins, Authors, Categories, Articles, and Comments. The project includes features like CRUD operations, JWT-based authentication, OTP login, robust error handling, pagination, filtering, and structured logging using Pino.

---

## **Technology Stack**

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **OTP Service**: Implemented via email using Nodemailer
- **Logging**: Pino for high-performance logging
- **Validation**: Joi for request data validation
- **Security**: Helmet for setting secure HTTP headers, express-rate-limit for rate limiting, express-mongo-sanitize, xss-clean, and hpp for data sanitization
- **Utilities**: bcryptjs for password hashing, dotenv for environment variables, compression for response compression, cors for Cross-Origin Resource Sharing

---

## **Folder Structure**

```
ITINFO/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── authorController.js
│   │   ├── categoryController.js
│   │   └── ... 
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── loggerMiddleware.js
│   │   └── validateMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── authorModel.js
│   │   ├── categoryModel.js
│   │   ├── ... 
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── ... 
│   ├── services/
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── authorService.js
│   │   ├── categoryService.js
│   │   └── ... 
│   ├── utils/
│   │   ├── constants/
│   │   │   ├── errorMessages.js
│   │   │   ├── statusCodes.js
│   │   │   └── ... 
│   │   ├── errorHandler/
│   │   │   ├── ApiError.js
│   │   │   └── catchAsync.js
│   │   ├── helpers/
│   │   │   ├── apiFeatures.js
│   │   │   ├── email.js
│   │   │   ├── logger.js
│   │   │   └── ... 
│   │   └── ... 
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── userValidator.js
│   │   ├── authorValidator.js
│   │   ├── categoryValidator.js
│   │   └── ... 
│   ├── app.js
│   └── server.js
├── tests/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── ... 
├── logs/
│   └── error.log
├── public/
│   ├── images/
│   ├── css/
│   └── js/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## **Setup and Installation**

### **Prerequisites**

- **Node.js** (v20 or above)
- **MongoDB** installed locally or a MongoDB Atlas account
- **npm** or **yarn** or **pnpm**

### **Installation Steps**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/ITINFO.git
   cd ITINFO
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/itinfo
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_ACCESS_SECRET=your_jwt_access_secret
   JWT_REFRESH_EXPIRES_IN=2d
   JWT_ACCESS_EXPIRES_IN=90d
   LOG_LEVEL=debug
   NODE_ENV=development
   ```

   > **Note:** Replace the placeholder values with your actual configuration.

4. **Run the Application**

   - **Development Mode:**

     ```bash
     npm run dev
     ```

   - **Production Mode:**

     ```bash
     npm start
     ```

---

## **Environment Variables**

Ensure that the following environment variables are set in your `.env` file:

- **PORT**: Port number on which the server will run (e.g., `4000`).
- **MONGODB_URI**: MongoDB connection string.
- **JWT_ACCESS_SECRET**: Secret key for signing JWT access tokens.
- **JWT_REFRESH_SECRET**: Secret key for signing JWT refresh tokens.
- **JWT_REFRESH_EXPIRES_IN**: JWT access token expiration duration (e.g., `1d`).
- **JWT_ACCESS_EXPIRES_IN**: JWT refresh token expiration duration (e.g., `90d`).
- **LOG_LEVEL**: Logging level (`debug`, `info`, `warn`, `error`).
- **NODE_ENV**: Environment mode (`development`, `production`).

--
## **Environment Variables**

Ensure that the following environment variables are set in your `.env` file:

- **PORT**: Port number on which the server will run (e.g., `4000`).
- **DATABASE_URL**: PostgreSQL connection string (e.g., `postgres://username:password@localhost:5432/itinfo`).
- **JWT_ACCESS_SECRET**: Secret key for signing JWT access tokens.
- **JWT_REFRESH_SECRET**: Secret key for signing JWT refresh tokens.
- **JWT_ACCESS_EXPIRES_IN**: JWT access token expiration duration (e.g., `90d`).
- **JWT_REFRESH_EXPIRES_IN**: JWT refresh token expiration duration (e.g., `2d`).
- **LOG_LEVEL**: Logging level (`debug`, `info`, `warn`, `error`).
- **NODE_ENV**: Environment mode (`development`, `production`).

---

## **API Endpoints**

### **Authentication**

### **Signup**

- **Endpoint:** `POST /api/v1/auth/signup`
- **Description:** Register a new user.
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password",
    "name": "User Name"
  }
  ```

#### **Login**

- **Endpoint:** `POST /api/v1/auth/login`
- **Description:** Authenticate user and receive JWT tokens.
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password"
  }
  ```

#### **Refresh Token**

- **Endpoint:** `POST /api/v1/auth/refresh-token`
- **Description:** Refresh JWT access token using a valid refresh token.
- **Body:**

  ```json
  {
    "refreshToken": "your_refresh_token"
  }
  ```entication**

#### **Signup**

- **Endpoint:** `POST /api/v1/auth/signup`
- **Description:** Register a new user.
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password",
    "name": "User Name"
  }
  ```

#### **Login**

- **Endpoint:** `POST /api/v1/auth/login`
- **Description:** Authenticate user and receive JWT token.
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password"
  }
  ```

### **6.2. User CRUD Operations**

#### **Create User**

- **Endpoint:** `POST /api/v1/users/`
- **Description:** Create a new user (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password",
    "name": "User Name",
    "roles": ["admin"] // admin or superAdmin
  }
  ```

### **User CRUD Operations**

#### **Create User**

- **Endpoint:** `POST /api/v1/users/`
- **Description:** Create a new user (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "strong_password",
    "name": "User Name",
    "role": "admin" // 'admin' or 'superadmin' or 'user'
  }
  ```

#### **Get All Users**

- **Endpoint:** `GET /api/v1/users/`
- **Description:** Retrieve all users (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Get User by ID**

- **Endpoint:** `GET /api/v1/users/{user_id}`
- **Description:** Retrieve a specific user by ID (SuperAdmin and Admin).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Update User**

- **Endpoint:** `PUT /api/v1/users/{user_id}`
- **Description:** Update user details (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**

  ```json
  {
    "email": "newemail@example.com",
    "password": "new_strong_password",
    "name": "New Name",
    "role": "user" // 'user', 'admin', or 'superadmin'
  }
  ```

#### **Delete User**

- **Endpoint:** `DELETE /api/v1/users/{user_id}`
- **Description:** Delete a user (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

### **User Profile Operations**

To empower ordinary users to manage their personal data securely, the following endpoints are introduced:

#### **Get Own Profile**

- **Endpoint:** `GET /api/v1/users/profile`
- **Description:** Retrieve the authenticated user's own profile information.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

- **Response Example:**

  ```json
  {
    "id": 5,
    "email": "user@example.com",
    "name": "User Name",
    "isActive": true,
    "role": "user",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-10T15:30:00Z"
  }
  ```

#### **Update Own Profile**

- **Endpoint:** `PUT /api/v1/users/profile`
- **Description:** Update the authenticated user's own profile information.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:** *(Any combination of the following fields can be updated)*

  ```json
  {
    "email": "newemail@example.com",
    "password": "new_strong_password",
    "name": "New Name"
  }
  ```

- **Notes:**
  - **Email Change:** Ensure the new email is unique and properly validated.
  - **Password Change:** Implement necessary validations and hashing.
  - **Name Change:** Optional field; can be updated as needed.

#### **Implementation Details**

- **Controller Functions:**
  - **getOwnProfile:** Fetches the profile of the currently authenticated user.
  - **updateOwnProfile:** Allows the user to update their email, password, and name.

- **Access Control:**
  - These endpoints are accessible to users with the role `user`, `admin`, or `superadmin`, allowing each user to manage their own profile.

- **Validation:**
  - Use Joi validators to ensure the data integrity for profile updates.

- **Security Considerations:**
  - Ensure that users cannot escalate privileges by altering their roles.
  - Sensitive fields like `password` must be handled securely with proper hashing and validation.

#### **Get All Users**

- **Endpoint:** `GET /api/v1/users/`
- **Description:** Retrieve all users (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Get User by ID**

- **Endpoint:** `GET /api/v1/users/{user_id}`
- **Description:** Retrieve a specific user by ID (SuperAdmin and Admin).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Update User**

- **Endpoint:** `PUT /api/v1/users/{user_id}`
- **Description:** Update user details (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**

  ```json
  {
    "email": "newemail@example.com",
    "password": "new_strong_password",
    "name": "New Name",
    "roles": ["user"] // user , admin or superAdmin
  }
  ```

#### **Delete User**

- **Endpoint:** `DELETE /api/v1/users/{user_id}`
- **Description:** Delete a user (SuperAdmin only).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Get All Categories**

- **Endpoint:** `GET /api/v1/categories/`
- **Description:** Retrieve all categories.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Get Category by ID**

- **Endpoint:** `GET /api/v1/categories/{category_id}`
- **Description:** Retrieve a specific category by ID.
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

#### **Update Category**

- **Endpoint:** `PUT /api/v1/categories/{category_id}`
- **Description:** Update category details (Admin and SuperAdmin).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
- **Body:**

  ```json
  {
    "name": "New Category Name",
    "description": "Updated description"
  }
  ```

#### **Delete Category**

- **Endpoint:** `DELETE /api/v1/categories/{category_id}`
- **Description:** Delete a category (Admin and SuperAdmin).
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

---

## **7. Authentication and Authorization**

### **7.1. JWT Integration**

**JWT (JSON Web Tokens)** are used to secure endpoints and manage user sessions. Here's how JWT is integrated into the project:

#### **7.1.1. Generating JWT Tokens**

- **Upon Successful Login or OTP Verification:**
  - A JWT token is generated containing the user's ID and roles.
  - The token is signed using a secret key defined in the `.env` file.
  - The token has an expiration time to enhance security.

#### **7.1.2. Middleware for Protecting Routes**

- **`authGuard` Middleware:**
  - Verifies the presence and validity of the JWT token.
  - Decodes the token to retrieve user information.
  - Attaches the user object to the request for downstream use.

- **`roleGuard` Middleware:**
  - Restricts access to routes based on user roles (e.g., SuperAdmin, Admin).

### **7.2. Role-Based Access Control**

Roles determine the level of access a user has within the application. The primary roles are:

- **SuperAdmin:**
  - Full access to all resources and operations.
  - Can manage Users, Admins, Authors, Categories, etc.

- **Admin:**
  - Can manage Authors and Categories.
  - Can perform CRUD operations on these resources but may have restrictions on certain sensitive actions like deleting users.

- **User:**
  - Limited access based on permissions (not covered in current CRUD operations).

#### **7.2.1. Implementing Roles in JWT**

When a user logs in, their roles are embedded within the JWT token. This allows the `roleGuard` middleware to check if the user has the necessary permissions to access a particular route.

## **8. Testing**

To ensure the reliability and correctness of your API endpoints, it's essential to write and run tests. Tools like **Postman** can be used for manual testing.

### **8.1. Manual Testing with Postman**

1. **Import API Collection:**
   - Create a new collection in Postman and add the endpoints as per the [API Endpoints](#api-endpoints) section.

2. **Testing Authentication:**
   - **Signup:** Test user registration.
   - **Login:** Authenticate and retrieve JWT token.

3. **Testing Protected Routes:**
   - Use the obtained JWT token in the `Authorization` header (`Bearer <token>`) to access protected endpoints.

4. **CRUD Operations:**
   - Test Create, Read, Update, and Delete operations for Users, Authors, and Categories.

**Key Features Implemented:**

- **CRUD Operations:** For Authors, Categories, Users, and Admins with appropriate access controls.
- **JWT Authentication:** Secure access to protected endpoints.
- **Validation:** Ensures data integrity using Joi.
- **Error Handling:** Centralized and consistent error responses.
- **Logging:** High-performance logging with Pino for effective monitoring.

By following the outlined folder structure and best practices, the project is well-positioned for further expansion, feature additions, and seamless collaboration among developers.
