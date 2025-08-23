# 🛒 ShopEasy – Amazon Clone

**ShopEasy** is a mini **Amazon clone** built using **React Native** for frontend and **MongoDB Atlas + Node.js/Express.js** for backend.  
Users can **browse products**, **manage carts**, **place orders**, and handle **profiles & addresses** seamlessly.

## 📚 Concepts Covered & Learned
### ✅ Frontend
- **React Native components:** `View`, `ScrollView`, `FlatList`, `Pressable`  
- **Async operations** with Axios & React hooks (`useEffect`, `useState`)  
- **Navigation using React Navigation (Stack & Bottom Tabs)**  
- **State management with Redux & Context AP**I  
- **Local persistence using AsyncStorage**  

### ✅ Backend
- **REST API development** with Node.js & Express.js  
- **MongoDB data modeling** with Mongoose schemas  
- **JWT authentication** & email verification  
- **Sending emails** using Nodemailer  

### ✅ Integration & Architecture
- **MVVM-style architecture** with reusable components  
- **Separation of concerns** (screens, components, services, Redux store)  
- **Handling async API calls** & reactive state updates  

### ✅ UI/UX & Animations
- **Responsive layouts** with clean UI  
- **Interactive product carousel** & Lottie animations  
- **Consistent design** using Expo Vector Icons  


## 🚀 Features Implemented

### 👤 Authentication & User Management
- User **Registration & Login** with **JWT authentication**
- **Email verification** using **Nodemailer**
- Persisted sessions with **AsyncStorage**
- **Profile management**:
  - View profile details
  - Update basic information (name, email)

### 🛍️ Product Catalog
- **Browse products** by categories
- View **product details** with **images & descriptions**
- Search & filter products (basic implementation)

### 🛒 Cart Management
- **Add/remove items** from cart
- **Adjust quantities** dynamically
- View **cart total** before checkout

### 📦 Order Placement
- **Place orders** selecting from saved addresses
- Track **order history**
- Orders stored in **MongoDB** with **timestamps**

### 🏠 Address Management
- **Add new addresses** for delivery
- **Delete addresses**
- Set **default address** for orders

### 🎨 Responsive UI
- **Clean, interactive design**
- **Product image carousel** using **SliderBox**
- **Lottie animations** for interactive feedback
- **Expo Vector Icons** for consistent UI


## 🛠️ Tech Stack

**Frontend**
- **React Native**, **Expo**  
- **Navigation: React Navigation (Stack & Bottom Tabs)**  
- **State Management: Redux, React Context API**  
- **Networking: Axios**  
- **Local Storage: AsyncStorage**  

**Backend**
- **Node.js**, **Express.js**  
- **MongoDB Atlas** with Mongoose  
- **Authentication:** JWT, Email Verification via Nodemailer  

**UI & Animations**
- **SliderBox** for product carousels  
- **LottieView** for animations  
- **Expo Vector Icons** 

## ✅ Key Learnings
- Built a **full-stack mobile app** from scratch using React Native & Node.js  
- Managed **authentication & authorization** using JWT  
- Created **dynamic & reactive UI** using Redux & Context API  
- Integrated **backend APIs** and **email verification**  
- Applied **modular, scalable architecture** and **clean code principles**  


## 🚧 Future Scope / Improvements
- Add **Edit Address** functionality  
- Implement **Payment Gateway integration**  
- **Advanced search & filtering** for products  
- **Wishlist & Favorites**  
- **Dark mode support**  
- **Push Notifications** for orders & promotions
