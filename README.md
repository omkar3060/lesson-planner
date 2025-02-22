# Lesson Planner App

**A React-based Lesson Planner App** integrating **Google Generative Language API (Gemini-Pro)** for lesson plan generation.

---

## 🚀 Features
- 🏫 **Lesson Plan Generation** using AI
- 🌙 **Dark Mode Toggle** with TailwindCSS
- 📱 **Responsive UI**
- ⚡ **Vite for Fast Development**

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/lesson-planner-app.git
cd lesson-planner-app
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Configure API Key
Create a `.env` file in the root directory:
```
VITE_API_KEY=your_google_api_key_here
```
> **Note:** Never expose your API key in the frontend!

### 4️⃣ Start the Development Server
```sh
npm run dev  # Runs on http://localhost:5173
```

---

## 🌍 API Integration Details

### 📡 API Endpoint
- **Development:** Requests are proxied via Vite (`/api`).
- **Production:** Requests go directly to Google’s API.

### 🔧 Proxy Configuration (`vite.config.js`)
```js
server: {
  proxy: {
    "/api": {
      target: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      changeOrigin: true,
      secure: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
}
```

### 📝 API Request Format
```js
fetch("/api?key=" + import.meta.env.VITE_API_KEY, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: `Generate a lesson plan for: ${JSON.stringify(details)}` }]
    }]
  })
});
```

### 🏗️ API Response Format
```json
{
  "candidates": [
    {
      "content": {
        "parts": [{ "text": "Generated Lesson Plan..." }]
      }
    }
  ]
}
```

---

## 🌑 Dark Mode Toggle

```jsx
<button
  onClick={toggleTheme}
  className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md transition-all hover:scale-105"
>
  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
</button>
```

---

## 🚀 Deployment

### **1️⃣ Deploy on Vercel**
```sh
npm install -g vercel
vercel
```

### **2️⃣ Common Issues & Fixes**
#### ❌ `pnpm: command not found`
```sh
npm install --no-frozen-lockfile
```

#### ❌ API 404 Error in Production
- Ensure **Vite's proxy works only in development**.
- Modify API calls to use the **actual API URL** in production.

---

## 📌 Future Enhancements
- ✅ User Authentication
- ✅ Real-time updates
- ✅ Optimized AI prompts

---

## 📝 License
**MIT Licensed**

---

## 📧 Contact
📌 **GitHub:** [your-username](https://github.com/your-username)
📌 **Email:** your-email@example.com

