import type { CharsetType, GenerationConfig, GenerationMode } from "@/entities/generation";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

const CHARSET_OPTIONS: { value: CharsetType; label: string }[] = [
  { value: "alphanumeric", label: "英数字" },
  { value: "alphanumeric-symbols", label: "英数字記号" },
  { value: "hiragana", label: "ひらがな" },
  { value: "katakana", label: "カタカナ" },
  { value: "kanji", label: "漢字" },
  { value: "mixed", label: "ミックス" },
];

const MODE_OPTIONS: { value: GenerationMode; label: string }[] = [
  { value: "random", label: "ランダム" },
  { value: "repeated", label: "繰り返し" },
];

type GenerateStringFormProps = {
  config: GenerationConfig;
  onUpdateConfig: (patch: Partial<GenerationConfig>) => void;
  onGenerate: () => void;
};

export function GenerateStringForm({
  config,
  onUpdateConfig,
  onGenerate,
}: GenerateStringFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="charCount">文字数</Label>
          <Input
            id="charCount"
            type="number"
            min={0}
            max={10000}
            value={config.charCount}
            onChange={(e) =>
              onUpdateConfig({ charCount: Number.parseInt(e.target.value, 10) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patternCount">パターン数</Label>
          <Input
            id="patternCount"
            type="number"
            min={1}
            max={100}
            value={config.patternCount}
            onChange={(e) =>
              onUpdateConfig({ patternCount: Number.parseInt(e.target.value, 10) || 1 })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>生成モード</Label>
        <div className="flex gap-2">
          {MODE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={config.mode === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onUpdateConfig({ mode: option.value })}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {config.mode === "random" ? (
        <div className="space-y-2">
          <Label>文字種</Label>
          <div className="flex flex-wrap gap-2">
            {CHARSET_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={config.charsetType === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onUpdateConfig({ charsetType: option.value })}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="repeatChar">繰り返し文字</Label>
          <Input
            id="repeatChar"
            type="text"
            maxLength={1}
            value={config.repeatChar}
            onChange={(e) => onUpdateConfig({ repeatChar: e.target.value || "a" })}
            className="w-20"
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        生成
      </Button>
    </form>
  );
}
