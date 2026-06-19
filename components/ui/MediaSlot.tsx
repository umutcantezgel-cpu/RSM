import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MediaSlotProps {
  label: string;
  className?: string;
}

export function MediaSlot({ label, className }: MediaSlotProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem]",
        "bg-gradient-to-br from-blue-50 via-white to-sky-100",
        "border border-blue-100",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/20 via-transparent to-transparent" />
      
      <div className="relative flex flex-col items-center gap-4 p-8 text-center">
        <ImageIcon className="w-12 h-12 text-blue-300" strokeWidth={1.5} />
        <span className="font-outfit text-sm font-semibold tracking-widest text-blue-800/50 uppercase">
          {`[ PLATZHALTER: ${label} ]`}
        </span>
      </div>
    </div>
  );
}
