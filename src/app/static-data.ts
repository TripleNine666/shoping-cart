export const CATEGORY: string[] = [
  'eat',
  'drink',
  'health',
  'gaming',
];

export const PROMO_CODES = [
  {code: 'FREEDELIVERY', type: 'delivery', value: 0},
  {code: 'DISCOUNT10', type: 'discount', value: 10},
  {code: 'DISCOUNT20', type: 'discount', value: 20},
];

export const SHIPPING_COST: number = 2.99;

export enum OrderStatus {
  Completed = "completed",
  Cancelled = "cancelled",
  New = "new",
}
