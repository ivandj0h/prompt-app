"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
  sender: "user" | "ai";
};

interface ChatProps {
  prompts: Prompt[];
  onNewPrompt: (data: Prompt) => void;
}

export default function ChatComponent({ prompts, onNewPrompt }: ChatProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    const userMessage: Prompt = {
      id: Date.now().toString(),
      question,
      generated_prompt: "",
      created_at: new Date().toISOString(),
      sender: "user",
    };

    onNewPrompt(userMessage);

    await supabase
      .from("chat_messages")
      .insert([{ sender: "user", message: question }]);

    try {
      const response = await fetch("/api/prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const botResponse = await response.json();

      const aiMessage: Prompt = {
        id: Date.now().toString(),
        question: "",
        generated_prompt: botResponse.generated_prompt,
        created_at: new Date().toISOString(),
        sender: "ai",
      };

      onNewPrompt(aiMessage);
      await supabase
        .from("chat_messages")
        .insert([{ sender: "ai", message: aiMessage.generated_prompt }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setQuestion("");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card className="p-4 space-y-4">
        <ScrollArea className="h-[400px] w-full overflow-y-auto border rounded-lg p-2">
          {prompts.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 mb-3 ${
                p.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar di luar bubble chat */}
              <Avatar
                className={`${p.sender === "user" ? "order-2" : "order-1"}`}
              >
                <AvatarImage
                  src={
                    p.sender === "user" ? "/user-avatar.png" : "/ai-avatar.png"
                  }
                  alt={p.sender === "user" ? "User" : "AI"}
                />
                <AvatarFallback>
                  {p.sender === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>

              {/* Bubble Chat */}
              <div
                className={`p-3 rounded-lg max-w-[75%] ${
                  p.sender === "user"
                    ? "bg-black text-white text-right order-1"
                    : "bg-gray-100 text-black order-2"
                }`}
              >
                <p className="text-sm font-semibold">
                  {p.sender === "user" ? p.question : p.generated_prompt}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Masukkan tipe pertanyaan..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Send"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
