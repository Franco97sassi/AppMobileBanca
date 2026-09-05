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

export type TransferDraft = {
  beneficiary: Beneficiary;
  amount: number;
  concept: string;
};

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type Beneficiary = { id: string; name: string; initials: string; iban: string; color: string };
export type Screen = 'home' | 'activity' | 'transfer' | 'cards' | 'profile';
