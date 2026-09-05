import { Account, Beneficiary, Transaction } from '../types';

export const initialAccounts: Account[] = [
  { id: 'main', name: 'Cuenta principal', number: '•••• 4821', balance: 12840.65, currency: 'EUR', color: ['#123E35', '#071F1A'] },
  { id: 'save', name: 'Ahorro inteligente', number: '•••• 1094', balance: 5270.2, currency: 'EUR', color: ['#9B7B39', '#55401B'] },
];

export const initialTransactions: Transaction[] = [
  { id: '1', title: 'Nómina Acme Studio', category: 'Ingresos', date: 'Hoy, 09:42', amount: 2840, icon: 'briefcase-outline', status: 'Completado' },
  { id: '2', title: 'Mercado Central', category: 'Alimentación', date: 'Ayer, 18:15', amount: -64.3, icon: 'basket-outline', status: 'Completado' },
  { id: '3', title: 'Spotify', category: 'Suscripciones', date: '2 sep', amount: -10.99, icon: 'musical-notes-outline', status: 'Completado' },
  { id: '4', title: 'Transferencia a Elena', category: 'Transferencias', date: '1 sep', amount: -250, icon: 'arrow-up-outline', status: 'Completado' },
  { id: '5', title: 'Metro Madrid', category: 'Transporte', date: '30 ago', amount: -21.8, icon: 'train-outline', status: 'Completado' },
];

export const beneficiaries: Beneficiary[] = [
  { id: 'ana', name: 'Ana López', initials: 'AL', iban: 'ES91 •••• 3842', color: '#DCECE6' },
  { id: 'marcos', name: 'Marcos Ruiz', initials: 'MR', iban: 'ES42 •••• 7619', color: '#F2E7CF' },
  { id: 'elena', name: 'Elena Soto', initials: 'ES', iban: 'ES18 •••• 2055', color: '#E2E5F3' },
];

export const money = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(value);
