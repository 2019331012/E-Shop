# 🛒 E-Shop — MERN Stack E-Commerce Platform

E-Shop is a full-featured e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform enables users to browse products, manage their carts, place orders, and make secure payments. It integrates external APIs for banks, suppliers, and e-commerce services to ensure seamless operations.

---

## ✨ Features

- 🔐 **User Authentication & Authorization**
  - Secure login/register for users and admins.
  - Role-based access control.

- 🛍️ **Product Management**
  - Browse, search, filter, and sort products.
  - Admin panel to add, update, or remove products.

- 🛒 **Shopping Cart & Checkout**
  - Add/remove products to/from cart.
  - Dynamic cart updates and total calculations.
  - Checkout with shipping information and order summary.

- 💳 **Payment Integration**
  - Connects with **bank APIs** for secure online payments.
  - Handles transaction status and failure scenarios.

- 📦 **Supplier & Inventory Sync**
  - Integrates with **supplier APIs** to fetch stock updates.
  - Automatically reflects real-time inventory changes.

- 🔄 **Order Management**
  - Users can view their order history and order status.
  - Admin can manage order processing and delivery.

---

## 🧱 Tech Stack

| Technology | Usage |
|------------|-------|
| **MongoDB** | Database for users, products, orders, etc. |
| **Express.js** | Backend API and middleware |
| **React.js** | Frontend user interface |
| **Node.js** | Backend server logic |
| **Axios** | HTTP client for API communication |
| **Redux** | State management |
| **Mongoose** | ODM for MongoDB |
| **Bootstrap/Tailwind** | Styling and responsive design |

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/201933012/E-Shop.git
cd E-Shop
```

### 2. Install Dependencies

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3. Run the App

```bash
# In two separate terminals

# Terminal 1 (backend)
cd backend
npm run dev

# Terminal 2 (frontend)
cd frontend
npm start
```

---

## 🧪 Testing

- Manual testing through UI
- Integration tests for API routes (e.g., using Jest or Mocha)

---

## 📬 API Integrations

- **Bank API** – For secure transaction processing.
- **Supplier API** – For real-time stock updates.
- **E-commerce tools** – (e.g., payment gateways, email notifications)

---

## 📣 Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

---
