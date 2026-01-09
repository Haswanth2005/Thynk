<div align="center">
  <!-- Replace with your actual logo or project banner if available -->
  <img src="./frontend/src/imgs/white.svg" alt="Thynk Banner" width="15%" /> 
  
  <h3>Where Ideas Connect. A Modern Full-Stack Blogging Platform.</h3>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-installation">Installation</a>
  </p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/MERN-Stack-blue?style=for-the-badge" alt="MERN Stack" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/AWS-S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS S3" />
  </p>
</div>

---

## 📖 Overview
**Thynk** isn't just another blog; it's a seamless digital space for storytellers and readers. Built for performance and aesthetics, it bridges the gap between complex content management systems and minimalist writing tools. Users can craft rich stories, engage with a vibrant community, and discover content that matters.

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **📝 Rich Text Editor** | A Medium-style block editor (**Editor.js**) supporting images, lists, code, and more. |
| **🔐 Secure Auth** | Hybrid authentication system using **JWT** and **Google OAuth** (Firebase). |
| **☁️ Cloud Powered** | Blazing fast image hosting and asset management via **AWS S3**. |
| **🔍 Smart Search** | Find content instantly by title, author, or tags using MongoDB regex. |
| **💬 Engagement** | Real-time nested comments, likes, and interactive notification system. |
| **📱 Responsive** | A mobile-first design crafted with **Tailwind CSS** and smooth **Framer Motion** animations. |
| **📈 Dynamic Feed** | "Trending" and "Latest" algorithms to surface the best content. |

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State/Animations**: Framer Motion
- **Editor**: Editor.js
- **Network**: Axios

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Storage**: AWS SDK (S3)
- **Auth**: Firebase Admin SDK & JWT

---

## 🚀 Installation & Setup

Follow these steps to set up Thynk locally.

### Prerequisites
- Node.js & npm
- MongoDB URI
- Firebase Project
- AWS S3 Bucket

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/thynk.git
cd thynk
```

### 2. Backend Config
```bash
cd server
npm install
```
Create a `.env` file in `/server`:
```env
PORT=3000
DB_LOCATION=your_mongodb_string
SECRET_ACCESS_KEY=your_jwt_secret
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name
GOOGLE_CLIENT_EMAIL=your_firebase_client_email
GOOGLE_PRIVATE_KEY=your_firebase_private_key
GOOGLE_PROJECT_ID=your_firebase_project_id
```
Run the server: `npm start`

### 3. Frontend Config
```bash
cd ../frontend
npm install
```
Create a `.env` file in `/frontend`:
```env
VITE_SERVER_DOMAIN=http://localhost:3000
```
Run the frontend: `npm run dev`

---

## 🤝 Contributing
Got an idea? Found a bug?
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">
  Made with ❤️ by <a href="www.linkedin.com/in/haswanth-m875">Haswanth</a>
</div>