import { useState, useCallback } from "react";
import type { GenerationConfig, GenerationResult } from "@/entities/generation";
import { DEFAULT_CONFIG } from "@/entities/generation";
import { generateString } from "@/shared/lib/generate-string";

export function useGenerateString() {
  const [config, setConfig] = useState<GenerationConfig>(DEFAULT_CONFIG);
  const [results, setResults] = useState<GenerationResult[]>([]);

  const generate = useCallback(() => {
    const newResults = generateString(config);
    setResults(newResults);
    return newResults;
  }, [config]);

  const updateConfig = useCallback((patch: Partial<GenerationConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const applyConfig = useCallback((newConfig: GenerationConfig) => {
    setConfig(newConfig);
  }, []);

  return { config, results, generate, updateConfig, applyConfig };
}
