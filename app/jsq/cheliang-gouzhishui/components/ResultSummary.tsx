import { Card } from "@/components/ui/card";
import { TaxResult } from '../types';
import { formatCurrency, formatPercent } from '../utils';
import { 
  Calculator, 
  Car,
  Receipt,
  ArrowDownToLine
} from 'lucide-react';

interface ResultSummaryProps {
  result: TaxResult;
}

export default function ResultSummary({ result }: ResultSummaryProps) {
  const summaryCards = [
    {
      title: "应税价格",
      value: result.taxablePrice,
      icon: Car,
      description: "计税依据金额"
    },
    {
      title: "购置税税率",
      value: result.taxRate,
      icon: Calculator,
      description: "适用税率",
      isPercent: true
    },
    {
      title: "应缴购置税",
      value: result.taxAmount,
      icon: Receipt,
      description: "应缴纳税额"
    },
    {
      title: "总费用",
      value: result.totalPrice,
      icon: ArrowDownToLine,
      description: "含税总费用"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-start space-x-3">
                <div className="rounded-lg p-2 bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{card.title}</div>
                  <div className="text-lg font-bold text-primary">
                    {card.isPercent ? formatPercent(card.value) : formatCurrency(card.value)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground space-y-1 p-4 bg-muted/50 rounded-lg">
        <p>* 以上结果仅供参考，实际金额以税务机关核定为准</p>
        <p>* 新能源汽车免征购置税</p>
        <p>* 计算结果已考虑13%增值税</p>
      </div>
    </div>
  );
}