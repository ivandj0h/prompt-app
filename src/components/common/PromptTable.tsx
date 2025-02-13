"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Prompt = {
  id: string;
  question: string;
  generated_prompt: string;
  created_at: string;
};

interface PromptTableProps {
  prompts: Prompt[];
}

export default function PromptTable({ prompts }: PromptTableProps) {
  const [search, setSearch] = useState("");

  // Filter prompts berdasarkan pencarian
  const filteredPrompts = prompts.filter(
    (p) =>
      p.question.toLowerCase().includes(search.toLowerCase()) ||
      p.generated_prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-4">
      {/* Search Form */}
      <input
        type="text"
        placeholder="Cari prompt..."
        className="border p-2 w-full mb-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table Wrapper dengan Scroll */}
      <div className="max-h-[400px] overflow-y-auto border rounded-lg">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white shadow z-10">
            <TableRow>
              <TableHead className="w-1/3">Pertanyaan</TableHead>
              <TableHead className="w-2/3">Generated Prompt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.question}</TableCell>
                  <TableCell>{p.generated_prompt}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-gray-500 p-4"
                >
                  Tidak ada prompt ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
