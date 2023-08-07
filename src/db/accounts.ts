export type Account = {
  id: string;
  password: string;
  accountNumber: string;
  balance: number;
};

export const accounts: Account[] = [
  {
    id: '1',
    password: '123456',
    accountNumber: '1234567890',
    balance: 100,
  },
  {
    id: '2',
    password: '654321',
    accountNumber: '0987654321',
    balance: 300,
  },
];
