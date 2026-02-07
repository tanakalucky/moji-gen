import { useCallback } from "react";
import type { HistoryEntry } from "@/entities/generation";
import { useGenerateString } from "@/features/generate-string";
import { useGenerationHistory } from "@/features/generation-history";
import { GeneratorPanel } from "@/widgets/generator-panel";
import { HistoryPanel } from "@/widgets/history-panel";

export function HomePage() {
  const { config, results, generate, updateConfig, applyConfig } = useGenerateString();
  const { history, addEntry, removeEntry, clearHistory } = useGenerationHistory();

  const handleGenerate = useCallback(() => {
    const newResults = generate();
    addEntry(config, newResults);
  }, [generate, addEntry, config]);

  const handleReuse = useCallback(
    (entry: HistoryEntry) => {
      applyConfig(entry.config);
    },
    [applyConfig],
  );

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Moji-Gen</h1>
        <p className="mt-1 text-muted-foreground">指定文字数の文字列ジェネレーター</p>
      </header>

      <div className="flex gap-6">
        <div className="w-1/2">
          <GeneratorPanel
            config={config}
            results={results}
            onUpdateConfig={updateConfig}
            onGenerate={handleGenerate}
          />
        </div>
        <div className="w-1/2">
          <HistoryPanel
            history={history}
            onReuse={handleReuse}
            onRemove={removeEntry}
            onClear={clearHistory}
          />
        </div>
      </div>
    </div>
  );
}
