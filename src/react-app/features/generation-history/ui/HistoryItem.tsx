import type { CharsetType, HistoryEntry } from "@/entities/generation";
import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { copyToClipboard } from "@/shared/lib/clipboard";

const CHARSET_LABELS: Record<CharsetType, string> = {
  alphanumeric: "英数字",
  "alphanumeric-symbols": "英数字記号",
  hiragana: "ひらがな",
  katakana: "カタカナ",
  kanji: "漢字",
  mixed: "ミックス",
};

type HistoryItemProps = {
  entry: HistoryEntry;
  onReuse: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
};

export function HistoryItem({ entry, onReuse, onRemove }: HistoryItemProps) {
  const { config, results, createdAt } = entry;
  const preview = results[0]?.value.slice(0, 30) ?? "";
  const timeStr = new Date(createdAt).toLocaleTimeString("ja-JP");
  const modeLabel = config.mode === "random" ? CHARSET_LABELS[config.charsetType] : "繰り返し";

  const handleCopy = async () => {
    const text = results.map((r) => r.value).join("\n");
    try {
      await copyToClipboard(text);
      toast.success("コピーしました");
    } catch {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md border p-3">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-1">
          <Badge variant="outline">{config.charCount}文字</Badge>
          <Badge variant="secondary">{modeLabel}</Badge>
          {results.length > 1 && <Badge variant="secondary">{results.length}件</Badge>}
          <span className="text-xs text-muted-foreground">{timeStr}</span>
        </div>
        <p className="truncate font-mono text-xs text-muted-foreground">
          {preview}
          {(results[0]?.value.length ?? 0) > 30 && "..."}
        </p>
      </div>
      <div className="ml-2 flex shrink-0 gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onReuse(entry)}>
          <RotateCcw className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          <Copy className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemove(entry.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
