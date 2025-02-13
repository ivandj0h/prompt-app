"use client";

import { useState } from "react";
import ChatComponent from "@/components/common/ChatComponent";

type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
  sender: "user" | "ai";
};

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  function handleNewPrompt(newPrompt: Prompt) {
    setPrompts((prev) => [...prev, newPrompt]);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auto Generate Prompt</h1>
      <ChatComponent prompts={prompts} onNewPrompt={handleNewPrompt} />{" "}
    </div>
  );
}
