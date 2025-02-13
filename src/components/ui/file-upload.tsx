"use client";

import { useRef } from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onUpload(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Label
        htmlFor="file-upload"
        className="cursor-pointer px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-100"
      >
        📁 Upload File
      </Label>
      <Input
        id="file-upload"
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
