"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmojiPicker from "@/components/ui/emoji-picker";
import FileUpload from "@/components/ui/file-upload";
import { Prompt } from "@/types/types";
import { CodeBlock, dracula } from "react-code-blocks";

interface ChatProps {
  prompts: Prompt[];
  onNewPrompt: (data: Prompt) => void;
}

export default function ChatComponent({ prompts, onNewPrompt }: ChatProps) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [emoji, setEmoji] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompts]);

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    if (!question.trim() && !file) return;
    setLoading(true);

    const userMessage: Prompt = {
      id: Date.now().toString(),
      question: question + (emoji ? ` ${emoji}` : ""),
      generated_prompt: "",
      created_at: new Date().toISOString(),
      sender: "user",
      file: file ? file.name : null,
    };

    onNewPrompt(userMessage);

    await supabase.from("chat_messages").insert([
      {
        sender: "user",
        message: userMessage.question,
        file: userMessage.file,
      },
    ]);

    try {
      const response = await fetch("/api/prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.question }),
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
      setFile(null);
      setEmoji("");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Button
        className="mb-4"
        onClick={async () => {
          const { data } = await supabase.from("chat_messages").select("*");
          console.log("Chat History:", data);
        }}
      >
        Chat History
      </Button>

      <Card className="p-4 space-y-4">
        <ScrollArea className="h-[400px] w-full overflow-y-auto border rounded-lg p-2">
          {prompts.map((p) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 mb-3 ${
                p.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
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
              <div
                className={`p-3 rounded-lg max-w-[75%] ${
                  p.sender === "user"
                    ? "bg-black text-white text-right order-1"
                    : "bg-gray-100 text-black order-2"
                }`}
              >
                {p.sender === "ai" && p.generated_prompt.includes("```") ? (
                  <CodeBlock
                    text={p.generated_prompt.replace(/```[a-z]*\n?|```/g, "")} // Hapus backticks
                    language="python"
                    theme={dracula}
                  />
                ) : (
                  <p className="text-sm font-semibold">
                    {p.sender === "user" ? p.question : p.generated_prompt}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </ScrollArea>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        >
          <FileUpload onUpload={(file) => setFile(file)} />
          <Input
            type="text"
            placeholder="Masukkan tipe pertanyaan..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1"
          />
          <EmojiPicker
            onSelect={(emoji) => {
              setEmoji(emoji);
              setQuestion((prev) => prev + emoji);
              handleSubmit();
            }}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Send"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
