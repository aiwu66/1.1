export const defaultTaxParams = {
  basePrice: '200000',
  includesVAT: true,
  additionalCosts: '0',
  isNewEnergy: false
};

export const vehicleTypes = [
  { label: '轿车', price: '150000-300000' },
  { label: 'SUV', price: '200000-500000' },
  { label: 'MPV', price: '150000-400000' },
  { label: '新能源车', price: '200000-400000', isNewEnergy: true },
  { label: '豪华车', price: '500000以上' }
];

export const additionalCostTypes = [
  { label: '上牌费', amount: 500 },
  { label: '车船税', amount: 300 },
  { label: '交强险', amount: 950 },
  { label: '车辆保险', amount: 3000 }
];