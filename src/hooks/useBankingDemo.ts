import { useCallback, useEffect, useRef, useState } from 'react';
import { BankingRepository, TransferCommand } from '../domain/banking';
import { InMemoryBankingRepository } from '../infrastructure/InMemoryBankingRepository';
import { Screen, Transaction } from '../types';

export function useBankingDemo(repository: BankingRepository = new InMemoryBankingRepository()) {
  const repositoryRef = useRef(repository);
  const [authenticated, setAuthenticated] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const loadTransactions = useCallback(async (signal?: AbortSignal) => {
    setLoading(true); setError(undefined);
    try { setTransactions(await repositoryRef.current.getTransactions(signal)); }
    catch (reason) { if (!signal?.aborted) setError(reason instanceof Error ? reason.message : 'Error inesperado'); }
    finally { if (!signal?.aborted) setLoading(false); }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void loadTransactions(controller.signal);
    return () => controller.abort();
  }, [loadTransactions]);

  const login = () => setAuthenticated(true);
  const logout = () => {
    setAuthenticated(false);
    setScreen('home');
  };
  const transfer = async (command: TransferCommand, signal?: AbortSignal): Promise<Transaction> => {
    const transaction = await repositoryRef.current.createTransfer(command, signal);
    setTransactions(current => current.some(item => item.id === transaction.id) ? current : [transaction, ...current]);
    return transaction;
  };

  return { authenticated, screen, transactions, loading, error, login, logout, setScreen, transfer, retry: loadTransactions };
}
