import type { GenerationConfig, GenerationResult } from "@/entities/generation";
import { getCharset } from "../charsets";

function generateRandomString(charset: string, length: number): string {
  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charset.length);
    chars.push(charset[index]);
  }
  return chars.join("");
}

function generateRepeatedString(char: string, length: number): string {
  return char.repeat(length);
}

export function generateString(config: GenerationConfig): GenerationResult[] {
  const { charCount, charsetType, mode, repeatChar, patternCount } = config;
  const results: GenerationResult[] = [];

  for (let i = 0; i < patternCount; i++) {
    let value: string;
    if (mode === "repeated") {
      value = generateRepeatedString(repeatChar, charCount);
    } else {
      const charset = getCharset(charsetType);
      value = generateRandomString(charset, charCount);
    }
    results.push({ value, actualCount: value.length });
  }

  return results;
}
