export type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
  sender: "user" | "ai";
  file?: string | null;
};
