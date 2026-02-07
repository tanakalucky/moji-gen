import type { HistoryEntry } from "@/entities/generation";
import { HistoryItem } from "./HistoryItem";

type HistoryListProps = {
  history: HistoryEntry[];
  onReuse: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
};

export function HistoryList({ history, onReuse, onRemove }: HistoryListProps) {
  if (history.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">履歴はまだありません</p>;
  }

  return (
    <div className="space-y-2 overflow-y-auto h-[calc(100vh-23rem)]">
      {history.map((entry) => (
        <HistoryItem key={entry.id} entry={entry} onReuse={onReuse} onRemove={onRemove} />
      ))}
    </div>
  );
}
