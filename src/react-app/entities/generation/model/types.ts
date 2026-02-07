export type CharsetType =
  | "alphanumeric"
  | "hiragana"
  | "katakana"
  | "kanji"
  | "mixed"
  | "alphanumeric-symbols";

export type GenerationMode = "random" | "repeated";

export type GenerationConfig = {
  charCount: number;
  charsetType: CharsetType;
  mode: GenerationMode;
  repeatChar: string;
  patternCount: number;
};

export type GenerationResult = {
  value: string;
  actualCount: number;
};

export type HistoryEntry = {
  id: string;
  createdAt: number;
  config: GenerationConfig;
  results: GenerationResult[];
};

export const DEFAULT_CONFIG: GenerationConfig = {
  charCount: 10,
  charsetType: "alphanumeric",
  mode: "random",
  repeatChar: "a",
  patternCount: 1,
};
