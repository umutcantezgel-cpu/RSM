import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'dark' = for light backgrounds, 'light' = for dark backgrounds
}

export function Logo({ className, variant = 'dark' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <Image 
      src="/assets/rsm-logo.jpg" 
      alt="RSM Systembau GmbH" 
      width={400} 
      height={100} 
      quality={100}
      className={cn(
        "h-[20px] md:h-[24px] w-auto",
        isDark 
          ? "mix-blend-multiply" 
          : "invert mix-blend-screen contrast-125 brightness-150", 
        className
      )} 
      priority
    />
  );
}
