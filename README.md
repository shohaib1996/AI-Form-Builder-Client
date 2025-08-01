# 🧠 AI Form Builder

An AI-powered form generation tool that allows users to create dynamic and customizable forms from natural language input. The app interprets prompts and instantly builds functional form components.

🚀 **Live Site**: [form-ai-builder.vercel.app](https://form-ai-builder.vercel.app/)

🔗 **Backend Repo**: [GitHub - AI Form Builder Backend](https://github.com/shohaib1996/AI-Form-Builder-Backend)

---

## ✨ Features

- Convert plain text prompts into complete forms
- Dynamic input generation with smart defaults
- Real-time preview and customization
- Form submission support via EmailJS
- Fully responsive and animated UI

---

## 🛠️ Tech Stack

**Frontend**:  
Next.js, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion, OpenAI API, EmailJS

**Backend**:  
Express.js, TypeScript, Node.js, OpenAI API, EmailJS

---

## 📦 Environment Variables (`.env.local`)

> ⚠️ **Important**: Do not share your API keys publicly.

Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api


npm install
npm run dev

