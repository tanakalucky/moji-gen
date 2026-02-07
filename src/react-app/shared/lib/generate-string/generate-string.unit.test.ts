import { describe, it, expect } from "vitest";
import { generateString } from "./generate-string";
import type { GenerationConfig } from "@/entities/generation";
import { DEFAULT_CONFIG } from "@/entities/generation";

describe("generateString", () => {
  it("指定した文字数のランダム文字列を生成する", () => {
    const config: GenerationConfig = { ...DEFAULT_CONFIG, charCount: 20 };
    const results = generateString(config);

    expect(results).toHaveLength(1);
    expect(results[0].actualCount).toBe(20);
    expect(results[0].value).toHaveLength(20);
  });

  it("指定したパターン数の文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charCount: 5,
      patternCount: 3,
    };
    const results = generateString(config);

    expect(results).toHaveLength(3);
    for (const result of results) {
      expect(result.actualCount).toBe(5);
    }
  });

  it("繰り返しモードで指定文字を繰り返す", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      mode: "repeated",
      repeatChar: "x",
      charCount: 10,
    };
    const results = generateString(config);

    expect(results[0].value).toBe("xxxxxxxxxx");
    expect(results[0].actualCount).toBe(10);
  });

  it("英数字のみを含む文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charsetType: "alphanumeric",
      charCount: 100,
    };
    const results = generateString(config);

    expect(results[0].value).toMatch(/^[A-Za-z0-9]+$/);
  });

  it("英数字記号を含む文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charsetType: "alphanumeric-symbols",
      charCount: 200,
    };
    const results = generateString(config);

    expect(results[0].actualCount).toBe(200);
  });

  it("ひらがな文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charsetType: "hiragana",
      charCount: 50,
    };
    const results = generateString(config);

    expect(results[0].actualCount).toBe(50);
    // ひらがな範囲 U+3041-U+3096
    for (const char of results[0].value) {
      const code = char.charCodeAt(0);
      expect(code).toBeGreaterThanOrEqual(0x3041);
      expect(code).toBeLessThanOrEqual(0x3096);
    }
  });

  it("カタカナ文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charsetType: "katakana",
      charCount: 50,
    };
    const results = generateString(config);

    expect(results[0].actualCount).toBe(50);
    for (const char of results[0].value) {
      const code = char.charCodeAt(0);
      expect(code).toBeGreaterThanOrEqual(0x30a1);
      expect(code).toBeLessThanOrEqual(0x30f6);
    }
  });

  it("漢字文字列を生成する", () => {
    const config: GenerationConfig = {
      ...DEFAULT_CONFIG,
      charsetType: "kanji",
      charCount: 30,
    };
    const results = generateString(config);

    expect(results[0].actualCount).toBe(30);
    for (const char of results[0].value) {
      const code = char.charCodeAt(0);
      expect(code).toBeGreaterThanOrEqual(0x4e00);
      expect(code).toBeLessThanOrEqual(0x4ff3);
    }
  });

  it("文字数0の場合は空文字列を返す", () => {
    const config: GenerationConfig = { ...DEFAULT_CONFIG, charCount: 0 };
    const results = generateString(config);

    expect(results[0].value).toBe("");
    expect(results[0].actualCount).toBe(0);
  });
});
