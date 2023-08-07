export type Receipt = {
  id: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  createdAt: Date;
};

export const receipts: Receipt[] = [
  {
    id: '6zu3b7i',
    fromAccountNumber: '1234567890',
    toAccountNumber: '0987654321',
    amount: 50,
    createdAt: new Date('2021-01-01T00:00:00.000Z'),
  },
];
