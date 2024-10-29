export interface TaxResult {
  taxablePrice: number;
  taxRate: number;
  taxAmount: number;
  totalPrice: number;
  priceBreakdown: {
    basePrice: number;
    vat: number;
    additionalCosts: number;
  };
}