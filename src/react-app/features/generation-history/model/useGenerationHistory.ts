import { useState, useCallback, useEffect } from "react";
import type { GenerationConfig, GenerationResult, HistoryEntry } from "@/entities/generation";
import { getStorageItem, setStorageItem } from "@/shared/lib/storage";

const STORAGE_KEY = "moji-gen-history";
const MAX_ENTRIES = 50;

function createId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function useGenerationHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() =>
    getStorageItem<HistoryEntry[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEY, history);
  }, [history]);

  const addEntry = useCallback((config: GenerationConfig, results: GenerationResult[]) => {
    const entry: HistoryEntry = {
      id: createId(),
      createdAt: Date.now(),
      config,
      results,
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
  }, []);

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory };
}
