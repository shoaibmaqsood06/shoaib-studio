import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Split a string into an array of word spans for text reveal animations */
export function splitWords(text: string): string[] {
  return text.split(" ").filter(Boolean);
}

/** Split a string into individual characters */
export function splitChars(text: string): string[] {
  return text.split("");
}

/** Wrap each word in an overflow-hidden container for line-reveal animations */
export function wrapWords(text: string): string {
  return text
    .split(" ")
    .map((w) => `<span class="word-wrap"><span class="word">${w}</span></span>`)
    .join(" ");
}
