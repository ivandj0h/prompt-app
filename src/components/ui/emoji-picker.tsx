"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">😀</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <Picker
          data={data}
          onEmojiSelect={(emoji: { native: string }) => {
            onSelect(emoji.native);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
