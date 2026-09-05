import { Transaction } from '../types';

export const AVAILABLE_BALANCE = 12_840.65;

export function parseAmount(input: string): number {
  const normalized = input.trim().replace(/\s/g, '').replace(',', '.');
  if (!/^\d+(?:\.\d{0,2})?$/.test(normalized)) return Number.NaN;
  return Number(normalized);
}

export function isValidTransfer(amount: string, hasBeneficiary: boolean, balance = AVAILABLE_BALANCE) {
  const value = parseAmount(amount);
  return hasBeneficiary && Number.isFinite(value) && value > 0 && value <= balance;
}

export function filterTransactions(transactions: Transaction[], filter: string, query: string) {
  const needle = query.trim().toLocaleLowerCase('es');
  return transactions.filter(transaction => {
    const matchesKind = filter === 'Todos' || (filter === 'Ingresos' ? transaction.amount > 0 : transaction.amount < 0);
    const searchable = `${transaction.title} ${transaction.category}`.toLocaleLowerCase('es');
    return matchesKind && searchable.includes(needle);
  });
}

export function transactionTotals(transactions: Transaction[]) {
  return transactions.reduce(
    (totals, transaction) => transaction.amount > 0
      ? { ...totals, income: totals.income + transaction.amount }
      : { ...totals, expenses: totals.expenses + Math.abs(transaction.amount) },
    { income: 0, expenses: 0 },
  );
}

export function todayLabel(date = new Date()) {
  const formatted = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
