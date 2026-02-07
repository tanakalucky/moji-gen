import type { CharsetType } from "@/entities/generation";

const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:',.<>?/~`";

const ALPHANUMERIC_SYMBOLS = ALPHANUMERIC + SYMBOLS;

// ひらがな U+3041-U+3096
const HIRAGANA = Array.from({ length: 0x3096 - 0x3041 + 1 }, (_, i) =>
  String.fromCharCode(0x3041 + i),
).join("");

// カタカナ U+30A1-U+30F6
const KATAKANA = Array.from({ length: 0x30f6 - 0x30a1 + 1 }, (_, i) =>
  String.fromCharCode(0x30a1 + i),
).join("");

// CJK Unified Ideographs 先頭500文字 U+4E00-U+4FF3
const KANJI = Array.from({ length: 500 }, (_, i) => String.fromCharCode(0x4e00 + i)).join("");

const CHARSET_MAP: Record<CharsetType, string> = {
  alphanumeric: ALPHANUMERIC,
  "alphanumeric-symbols": ALPHANUMERIC_SYMBOLS,
  hiragana: HIRAGANA,
  katakana: KATAKANA,
  kanji: KANJI,
  mixed: ALPHANUMERIC + HIRAGANA + KATAKANA + KANJI,
};

export function getCharset(type: CharsetType): string {
  return CHARSET_MAP[type];
}
