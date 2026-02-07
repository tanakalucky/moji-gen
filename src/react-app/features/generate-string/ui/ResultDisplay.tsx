import type { GenerationResult } from "@/entities/generation";
import { Badge } from "@/shared/ui/Badge";
import { CopyButton } from "@/features/copy-result";

type ResultDisplayProps = {
  results: GenerationResult[];
};

export function ResultDisplay({ results }: ResultDisplayProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-3">
      {results.map((result, index) => (
        <div
          key={`${index}-${result.value.slice(0, 8)}`}
          className="rounded-md border bg-muted/50 p-3"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge variant="secondary">{result.actualCount}文字</Badge>
            <CopyButton text={result.value} />
          </div>
          <p className="break-all font-mono text-sm">{result.value}</p>
        </div>
      ))}
    </div>
  );
}
