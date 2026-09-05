import { useState } from 'react';
import { initialTransactions } from '../data/demo';
import { Screen, Transaction } from '../types';

export function useBankingDemo() {
  const [authenticated, setAuthenticated] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const login = () => setAuthenticated(true);
  const logout = () => {
    setAuthenticated(false);
    setScreen('home');
  };
  const addTransaction = (transaction: Transaction) => setTransactions(current => [transaction, ...current]);

  return { authenticated, screen, transactions, login, logout, setScreen, addTransaction };
}
