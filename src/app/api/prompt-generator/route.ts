import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    // Generate prompt pakai ChatGPT
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Buatkan prompt yang bagus berdasarkan input user.",
        },
        { role: "user", content: question },
      ],
    });

    const generatedPrompt =
      chatCompletion.choices[0].message.content || "Prompt tidak tersedia.";

    // Simpan ke Supabase
    const { data, error } = await supabase
      .from("prompt_generator")
      .insert([{ question, generated_prompt: generatedPrompt }])
      .select("*");

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("prompt_generator")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
