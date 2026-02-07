import type { HistoryEntry } from "@/entities/generation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Trash2 } from "lucide-react";
import { HistoryList } from "@/features/generation-history";

type HistoryPanelProps = {
  history: HistoryEntry[];
  onReuse: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
};

export function HistoryPanel({ history, onReuse, onRemove, onClear }: HistoryPanelProps) {
  return (
    <Card className="max-h-[calc(100vh-12rem)]">
      <CardHeader>
        <CardTitle>生成履歴</CardTitle>

        <CardDescription>過去の生成結果（最大50件）</CardDescription>

        {history.length > 0 && (
          <CardAction>
            <Button variant="ghost" size="sm" onClick={onClear}>
              <Trash2 className="mr-1 h-3.5 w-3.5" />
              全削除
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <HistoryList history={history} onReuse={onReuse} onRemove={onRemove} />
      </CardContent>
    </Card>
  );
}
