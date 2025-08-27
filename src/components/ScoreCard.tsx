import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ScoreCardProps {
  score: number;
  previousScore?: number;
  incomeStability: number;
  expenseVolatility: number;
  dsr: number;
}

const getScoreColor = (score: number) => {
  if (score >= 750) return "score-excellent";
  if (score >= 650) return "score-good";
  if (score >= 550) return "score-fair";
  return "score-poor";
};

const getScoreLabel = (score: number) => {
  if (score >= 750) return "Excellent";
  if (score >= 650) return "Good";
  if (score >= 550) return "Fair";
  return "Poor";
};

const ScoreCard = ({ 
  score, 
  previousScore, 
  incomeStability, 
  expenseVolatility, 
  dsr 
}: ScoreCardProps) => {
  const scoreChange = previousScore ? score - previousScore : 0;
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <Card className="bg-gradient-card shadow-glow border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-bold">Your NayaFlow</span>
          <Badge 
            variant="secondary" 
            className={`bg-${scoreColor} text-white border-0`}
          >
            {scoreLabel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Score Display */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className={`text-5xl font-bold text-${scoreColor}`}>
                {score}
              </span>
              {scoreChange !== 0 && (
                <div className="flex items-center gap-1">
                  {scoreChange > 0 ? (
                    <TrendingUp className="h-5 w-5 text-secondary" />
                  ) : scoreChange < 0 ? (
                    <TrendingDown className="h-5 w-5 text-destructive" />
                  ) : (
                    <Minus className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className={`text-sm font-medium ${
                    scoreChange > 0 ? 'text-secondary' : 
                    scoreChange < 0 ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`}>
                    {scoreChange > 0 ? '+' : ''}{scoreChange}
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">Out of 900</p>
          </div>

          {/* Score Factors */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Income Stability</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(incomeStability * 100)}%
                </span>
              </div>
              <Progress 
                value={incomeStability * 100} 
                className="h-2"
                // @ts-ignore
                style={{"--progress-background": incomeStability > 0.7 ? "hsl(var(--income-stable))" : "hsl(var(--income-volatile))"}}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Expense Control</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((1 - expenseVolatility) * 100)}%
                </span>
              </div>
              <Progress 
                value={(1 - expenseVolatility) * 100} 
                className="h-2"
                // @ts-ignore
                style={{"--progress-background": expenseVolatility < 0.3 ? "hsl(var(--income-stable))" : "hsl(var(--income-volatile))"}}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Debt Serviceability</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(dsr * 100)}% DSR
                </span>
              </div>
              <Progress 
                value={Math.max(0, (1 - dsr) * 100)} 
                className="h-2"
                // @ts-ignore
                style={{"--progress-background": dsr < 0.35 ? "hsl(var(--income-stable))" : "hsl(var(--income-volatile))"}}
              />
            </div>
          </div>

          {/* Score Range Indicator */}
          <div className="bg-muted rounded-lg p-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>300</span>
              <span>900</span>
            </div>
            <div className="relative h-2 bg-gradient-to-r from-score-poor  via-score-good to-score-excellent rounded-full">
              <div 
                className="absolute top-0 h-2 w-2 bg-foreground rounded-full transform -translate-x-1/2"
                style={{ left: `${((score - 300) / 600) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;