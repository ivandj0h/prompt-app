"use client";

import { useState } from "react";
import { Prompt } from "@/types/types";
import ChatComponent from "@/components/common/ChatComponent";

export default function Home() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  function handleNewPrompt(newPrompt: Prompt) {
    setPrompts((prev) => [
      ...prev,
      {
        ...newPrompt,
        sender: newPrompt.sender as "user" | "ai",
      },
    ]);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MyChat App</h1>
      <ChatComponent prompts={prompts} onNewPrompt={handleNewPrompt} />
    </div>
  );
}
