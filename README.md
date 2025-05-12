# 🍽️ FOOD EXPLORER
A React-based food product explorer that lets users browse, search, and view details of food products using the OpenFoodFacts API with secure authentication managed via Appwrite.

## Features
🔐 Authentication: Sign up, log in, and log out functionality using Appwrite

🏠 Landing Page: Welcomes users and guides them to explore food products

🛒 Product List: View paginated list of products

🔍 Search Products: Search food items with name-based substring matching

📦 Product Details: View nutrition, ingredients, and category info

🧠 Protected Routes: Pages like /productlist and /search/:query are protected by authentication

## Tech Stack
Frontend: React, Tailwind CSS, React Router

State Management: Redux Toolkit

API: OpenFoodFacts Public API

Auth & Backend: Appwrite (self-hosted cloud backend)

## 🚀 Getting Started
### Prerequisites

Node.js and npm

Appwrite project setup with authentication enabled

### Installation
git clone https://github.com/Mukul-2205/FOOD-EXPLORER.git

cd FOOD-EXPLORER

npm install

### Configuration
Create a .env file and set:

VITE_APPWRITE_PROJECT_ID=your_project_id

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

### Run Project
npm run dev

### ⚙️ Method Used to Solve the Problem

Authentication: Appwrite SDK handles signup/login, session management, and secure state storage in Redux.

Data Fetching: Used fetch API to interact with OpenFoodFacts endpoints. Search uses search_terms and filters data client-side using case-insensitive substring matching.

Protected Routing: Custom Protected component checks Redux auth state and redirects if unauthorized.

Pagination & Load More: Implemented in search and list view with hasMore state flag.

Error & Loading States: All major async actions handle and display errors and loading spinners gracefully.


## Live Link of the project deployed on vercel
[
food-explorer-gamma.vercel.app](https://food-explorer-gamma.vercel.app/)

