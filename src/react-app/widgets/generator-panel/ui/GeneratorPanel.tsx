import type { GenerationConfig, GenerationResult } from "@/entities/generation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Separator } from "@/shared/ui/Separator";
import { GenerateStringForm, ResultDisplay } from "@/features/generate-string";

type GeneratorPanelProps = {
  config: GenerationConfig;
  results: GenerationResult[];
  onUpdateConfig: (patch: Partial<GenerationConfig>) => void;
  onGenerate: () => void;
};

export function GeneratorPanel({
  config,
  results,
  onUpdateConfig,
  onGenerate,
}: GeneratorPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>文字列生成</CardTitle>
        <CardDescription>指定した文字数・文字種で文字列を生成します</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <GenerateStringForm
          config={config}
          onUpdateConfig={onUpdateConfig}
          onGenerate={onGenerate}
        />
        {results.length > 0 && (
          <>
            <Separator />
            <ResultDisplay results={results} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
