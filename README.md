
# **Lexora Chat Application**

Lexora is a real-time, theme-switchable chat application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and **Socket.IO** for real-time communication. It offers a unique chat experience with custom Lexus IDs, global user search, and aesthetically pleasing themes inspired by **ShadCN** and **Aceternity UI**.

---

## **Frontend: React + Vite**

The Lexora frontend is built using **React** with **Vite** as the build tool, providing a fast and efficient development environment.

### **Features**
- **Real-time Messaging**: Powered by **Socket.IO** for instant communication.
- **User Authentication**: Sign up and log in with a custom Lexus ID.
- **Global Search**: Search for users globally and initiate chats.
- **Chat Backup**: Messages can be recovered on any device.
- **Modern UI Design**: Inspired by **ShadCN** and **Aceternity UI**.

---

### **Setup and Installation**

#### **Prerequisites**
- Node.js (version 23.10 or higher)
- NPM or Yarn

#### **Steps to Run Frontend Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/Coder-philosopher/lexora-frontend.git
   cd lexora-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open `http://localhost:5173` in your browser.

---

### **Configuration**

#### **Axios Instance Configuration**
```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://.../api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
```

#### **Socket.IO Client Configuration**
```javascript
import { io } from 'socket.io-client';

const socket = io(, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

export default socket;
```

---

## **Backend: Node.js + Express**

The backend is built with **Node.js** and **Express**, handling API requests and real-time communication using **Socket.IO**.

### **Steps to Run Backend Locally**
1. Clone the backend repository:
   ```bash
   git clone {it is private}
   cd lexora-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```env
   PORT=8000

   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The backend will be accessible at `http://localhost:8000`.


---

## **Deployment**

### **Frontend Deployment (Vercel)**
1. Connect your repository to **Vercel**.
2. Deploy using default **Vite** settings.

### **Backend Deployment (Railway)**
1. Deploy with proper CORS and WebSocket settings.
   ```javascript
   cors: {
     origin: ['https://lexora-taupe.vercel.app'],
     credentials: true,
   }
   ```

---

## **Known Issues**
- **WebSocket on Vercel**: Vercel may have issues with persistent WebSockets. Use **polling** as a fallback.
- **Initial Page Load Issue**: `/contact` route may require a refresh due to routing setup.

---

## **Contact**
- **Email**: [abdullahsknitrr@gmail.com](mailto:abdullahsknitrr@gmail.com)
- **LinkedIn**: [Shaikh Abdullah](https://www.linkedin.com/in/abdullah-shaikh-97309b297/)
```