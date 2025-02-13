# Auto-Generate Prompt CRUD with Next.js 15, Supabase & ChatGPT-4o

This project is a **Next.js 15 App Router** application that provides a CRUD system for automatically generating AI prompts using **ChatGPT-4o**. The generated prompts are stored in **Supabase** and displayed in a **data table** with **searching, pagination, and sorting** features.

## 🚀 Features

✅ **User Input Form**: Users can input question types in a textbox.
✅ **AI Prompt Generation**: The app calls ChatGPT-4o to generate a structured prompt based on user input.
✅ **Supabase Database Integration**: Generated prompts are stored in a PostgreSQL database.
✅ **Interactive Data Table**: View, search, sort, and paginate stored prompts.
✅ **Next.js 15 (App Router) Optimized**: Fully serverless and API-based CRUD.

---

## 🛠️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ivandj0h/prompt-app.git
cd prompt-app
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the root directory and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📦 API Endpoints

### 🔹 Generate a Prompt

**Endpoint:** `POST /api/generate`

- **Request Body:** `{ "question": "Your question here" }`
- **Response:** `{ "id": "uuid", "question": "Your question", "generated_prompt": "Generated AI Prompt" }`

---

## 🗄️ Database Schema (Supabase)

```sql
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  generated_prompt TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 🎨 Tech Stack

- **Next.js 15 (App Router)** - Server Components & API Routes
- **Supabase** - PostgreSQL as a Database
- **ChatGPT-4o** - AI-generated prompts
- **TanStack Table (React Table)** - Sorting, Pagination, and Searching
- **Tailwind CSS** - Styling

---

## 🚀 Deploying to Vercel

To deploy this project on **Vercel**, run:

```bash
npx vercel
```

Follow the instructions to complete the deployment. Your app will be live at `https://your-vercel-app.vercel.app/`.

---

## 🎯 Future Improvements

✅ Add categories/tags for better prompt management.
✅ Implement a favorite system to save frequently used prompts.
✅ Enhance UI with animations and a better UX.

Feel free to contribute and improve this project! 🔥
