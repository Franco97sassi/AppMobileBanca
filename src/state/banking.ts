import { Account, Beneficiary, Transaction } from '../types';

export type BankingState = { accounts: Account[]; transactions: Transaction[] };
export type TransferInput = { beneficiary: Beneficiary; amount: number; concept?: string; date?: string; id?: string };
export type BankingAction =
  | { type: 'transfer/completed'; payload: TransferInput }
  | { type: 'demo/reset'; payload: BankingState };

export function bankingReducer(state: BankingState, action: BankingAction): BankingState {
  if (action.type === 'demo/reset') return action.payload;

  const source = state.accounts.find(account => account.id === 'main');
  const { amount, beneficiary, concept } = action.payload;
  if (!source || !Number.isFinite(amount) || amount <= 0 || amount > source.balance) return state;

  const transaction: Transaction = {
    id: action.payload.id ?? Date.now().toString(),
    title: `Transferencia a ${beneficiary.name}`,
    category: concept?.trim() || 'Transferencias',
    date: action.payload.date ?? 'Ahora',
    amount: -amount,
    icon: 'arrow-up-outline',
    status: 'Completado',
  };

  return {
    accounts: state.accounts.map(account =>
      account.id === source.id ? { ...account, balance: account.balance - amount } : account,
    ),
    transactions: [transaction, ...state.transactions],
  };
}

export const totalBalance = (accounts: Account[]) =>
  accounts.reduce((total, account) => total + account.balance, 0);

export const transactionTotals = (transactions: Transaction[]) =>
  transactions.reduce(
    (totals, transaction) => ({
      income: totals.income + Math.max(transaction.amount, 0),
      expenses: totals.expenses + Math.abs(Math.min(transaction.amount, 0)),
    }),
    { income: 0, expenses: 0 },
  );
