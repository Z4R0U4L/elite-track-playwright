# 🚚 Delivery Management System – E2E Test Suite

A complete **end-to-end testing suite** built with **Playwright** to validate the functionality of a Delivery Management System web application.  
This project ensures reliability across authentication, order management, and delivery workflows for both **merchants** and **drivers**.

---

## 📌 Project Overview

This repository contains automated UI tests covering:

- Landing page navigation
- User authentication (Login / Register)
- Merchant dashboard operations
- Driver workflow & delivery lifecycle

All tests are written using **Playwright** and follow structured, real-world user scenarios.

---

## 🧪 Test Coverage Summary

| Module                     | Test Cases |
|--------------------------|----------|
| Landing Page              | 9        |
| Login                     | 2        |
| Sign Up                   | 9        |
| Merchant Dashboard        | 8        |
| Driver Dashboard          | 8        |
| **Total**                 | **36**   |

---

## 📂 Project Structure

```
.
├── pages/
│   ├── LoginPage.js
│   └── RegisterPage.js
│
├── tests/
│   ├── landingPageTest.spec.js
│   ├── loginTest.spec.js
│   ├── signUpTest.spec.js
│   ├── dashboardMerchant.spec.js
│   └── driverPage.spec.js
│
├── playwright-report/
├── test-results/
│
├── playwright.config.js
├── auth.json
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git](https://github.com/Z4R0U4L/elite-track-playwright.git
cd elite-track-playwright.git
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Install Playwright browsers
```bash
npx playwright install
```

---

## ▶️ Running Tests

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/loginTest.spec.js
```

---

## 📊 Test Reports

After execution, view the HTML report:

```bash
npx playwright show-report
```

---

## 🔐 Test Credentials

For demo/testing purposes:

- **Merchant**
  - Email: `zakiilyass12@gmail.com`
  - Password: `zaroual123`

- **Driver**
  - Email: `achraf1111@gmail.com`
  - Password: `123456789`

---

## 🚀 Key Features Tested

### 🔑 Authentication
- Login validation (valid & invalid)
- User registration with validations
- Role-based access (Merchant / Driver)

### 📦 Merchant Dashboard
- Create orders
- Assign delivery drivers
- Cancel orders
- Filter orders by status
- Manage delivery personnel

### 🚴 Driver Workflow
- View assigned deliveries
- Start & complete deliveries
- GPS toggle simulation
- Open delivery location in maps

---

## 🛠️ Tech Stack

- **Playwright**
- **JavaScript (Node.js)**
- **HTML Reports**
---

## 👨‍💻 Author
Noureddine ZAROUAL
GitHub: https://github.com/Z4R0U4L


This project is licensed under the MIT License.
