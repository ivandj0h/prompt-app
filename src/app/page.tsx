"use client";

import { useState } from "react";
import PromptForm from "@/components/common/PromptForm";
import PromptTable from "@/components/common/PromptTable";

type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
};

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  function handleNewPrompt(newPrompt: Prompt) {
    setPrompts((prev: Prompt[]) => [newPrompt, ...prev]);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Auto Generate Prompt</h1>
      <PromptForm onNewPrompt={handleNewPrompt} />
      <PromptTable prompts={prompts} /> {/* Pastikan prompts dipakai di sini */}
    </div>
  );
}
