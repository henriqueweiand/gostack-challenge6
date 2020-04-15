// eslint-disable-next-line import/prefer-default-export
export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export interface TransactionRequest {
  title: string;
  value: number;
  type: TransactionType;
  category: string;
}
