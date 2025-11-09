# Vibe Commerce - Full Stack Mock E-Commerce Cart

## Overview
This project is a basic full-stack shopping cart application designed for Vibe Commerce screening. It supports adding and removing items, calculating totals, and performing a mock checkout (no real payments). The app acts as a comprehensive test of UI, API, and database integration for typical e-commerce flows.

***

## Tech Stack
- **Frontend:** React  
- **Backend:** Node.js with Express  
- **Database:** MongoDB (or SQLite as alternate)  
- **Communication:** REST APIs  


***

## Features

### Backend API Endpoints
- **GET /api/products**  
  Returns 5-10 mock products (with fields: id, name, price).
- **POST /api/cart**  
  Add a { productId, qty } item to the cart.
- **DELETE /api/cart/:id**  
  Remove a product by cart item ID.
- **GET /api/cart**  
  Retrieve current cart items including total price.
- **POST /api/checkout**  
  Submit cart items for checkout, returning a mock receipt with total and timestamp.

***

### Frontend (React)
- **Products Grid**  
  Displays products with "Add to Cart" buttons.
- **Cart View**  
  Shows cart items with quantity, total, remove and update buttons.
- **Checkout Form**  
  Collects user name and email; submits cart and shows a receipt modal.
- **Responsive Design**  
  Fully usable on mobile, tablet, and desktop.

***

## Project Structure

### Frontend (`frontend/`)
```
public/                      # Static files (index.html, favicon)
src/
├── components/              # Reusable UI components
│   ├── Cart/
│   │   ├── CartItem.js
│   │   ├── CartView.js
│   ├── Products/
│   │   ├── ProductCard.js
│   │   ├── ProductGrid.js
│   ├── Checkout/
│   │   ├── CheckoutForm.js
│   │   ├── ReceiptModal.js
├── context/                 # React context for global state (CartContext)
├── hooks/                   # Custom React hooks (e.g., useProducts)
├── services/                # API service calls (api.js)
├── styles/                  # CSS files
├── App.js                   # Root React component
├── index.js                 # React DOM rendering
└── setupTests.js            # Test environment setup
package.json                 # Frontend dependencies
README.md                    # Frontend README (this file)
```

### Backend (`backend/`)
```
controllers/                # API route handlers
├── cartController.js
├── productController.js
models/                     # Mongoose or schema models
├── CartItem.js
├── Product.js
routes/                     # Express route definitions
├── cartRoutes.js
├── productRoutes.js
services/                   # Business logic, DB access
utils/                      # Utilities/helpers
config/                     # DB config, environment variables
├── db.js
server.js                   # Main server entry point
package.json                # Backend dependencies
.env                        # Environment variables (Mongo URI, port)
README.md                   # Backend README (this file)
```

***

## Getting Started

### Prerequisites
- Node.js v14 or above
- MongoDB instance (or SQLite environment)
- npm or yarn package manager

### Running Locally

1. **Backend**  
```bash
cd backend
npm install
npm run dev      

2. **Frontend**  
```bash
cd frontend
npm install
npm start
```

3. Open `http://localhost:3000` in your browser to view the app.

***


## Notes
- CORS is enabled for `http://localhost:3000` in backend for secure communication during dev.
- Checkout is a mock process and does not involve real payments or gateways.
- Products and carts are persisted in MongoDB (or configured database).
