import { Card } from "@/components/ui/card";
import { TaxResult } from '../types';
import { formatCurrency } from '../utils';

interface TaxBreakdownProps {
  result: TaxResult;
}

export default function TaxBreakdown({ result }: TaxBreakdownProps) {
  const breakdownItems = [
    {
      label: '车辆价格（不含税）',
      value: result.priceBreakdown.basePrice,
      type: 'base'
    },
    {
      label: '增值税（13%）',
      value: result.priceBreakdown.vat,
      type: 'tax'
    },
    {
      label: '其他费用',
      value: result.priceBreakdown.additionalCosts,
      type: 'base'
    },
    {
      label: '应税价格',
      value: result.taxablePrice,
      type: 'subtotal'
    },
    {
      label: '购置税',
      value: result.taxAmount,
      type: 'tax'
    },
    {
      label: '总费用',
      value: result.totalPrice,
      type: 'total'
    }
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {breakdownItems.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              item.type === 'subtotal' ? 'pt-4 border-t' :
              item.type === 'total' ? 'pt-4 border-t font-medium text-lg' : ''
            }`}
          >
            <span className={item.type === 'tax' ? 'text-destructive' : ''}>
              {item.label}
            </span>
            <span className={`
              ${item.type === 'tax' ? 'text-destructive' : ''}
              ${item.type === 'total' ? 'text-primary font-bold' : ''}
            `}>
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
        <p>费用说明：</p>
        <ul className="list-disc list-inside space-y-1">
          <li>不含税价格：实际成交价格÷1.13（如价格已含税）</li>
          <li>增值税：不含税价格×13%</li>
          <li>应税价格：不含税价格 + 其他费用</li>
          <li>购置税：应税价格×10%（新能源车免税）</li>
        </ul>
      </div>
    </Card>
  );
}