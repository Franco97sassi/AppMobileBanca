export type Account = {
  id: string;
  name: string;
  number: string;
  balance: number;
  currency: 'EUR' | 'USD';
  color: [string, string];
};

export type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  icon: string;
  status: 'Completado' | 'Pendiente';
};

export type Beneficiary = { id: string; name: string; initials: string; iban: string; color: string };
export type Screen = 'home' | 'activity' | 'transfer' | 'cards' | 'profile';
