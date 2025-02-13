"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
};

export default function PromptForm({
  onNewPrompt,
}: {
  onNewPrompt: (data: Prompt) => void;
}) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("/api/prompt-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const newPrompt = await response.json();
    onNewPrompt(newPrompt);
    setQuestion("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Masukkan tipe pertanyaan..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
}
