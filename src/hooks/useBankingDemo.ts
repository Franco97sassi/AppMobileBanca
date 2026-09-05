import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppNavigation } from '../navigation/useAppNavigation';
import { BankingRepository } from '../services/BankingRepository';
import { InMemoryBankingRepository } from '../services/InMemoryBankingRepository';
import { AsyncStatus, Transaction, TransferDraft } from '../types';

export function useBankingDemo(repositoryOverride?: BankingRepository) {
  const repository = useMemo(
    () => repositoryOverride ?? new InMemoryBankingRepository(),
    [repositoryOverride],
  );
  const navigation = useAppNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsStatus, setTransactionsStatus] = useState<AsyncStatus>('idle');
  const [transactionsError, setTransactionsError] = useState<string>();

  const loadTransactions = useCallback(async (signal?: AbortSignal) => {
    setTransactionsStatus('loading');
    setTransactionsError(undefined);
    try {
      setTransactions(await repository.listTransactions(signal));
      setTransactionsStatus('success');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setTransactionsError('No pudimos cargar tus movimientos. Inténtalo de nuevo.');
      setTransactionsStatus('error');
    }
  }, [repository]);

  useEffect(() => {
    const controller = new AbortController();
    void loadTransactions(controller.signal);
    return () => controller.abort();
  }, [loadTransactions]);

  const login = () => setAuthenticated(true);
  const logout = () => {
    setAuthenticated(false);
    navigation.reset();
  };
  const createTransfer = async (draft: TransferDraft, idempotencyKey: string) => {
    const transaction = await repository.createTransfer(draft, idempotencyKey);
    setTransactions(current => current.some(item => item.id === transaction.id)
      ? current
      : [transaction, ...current]);
    return transaction;
  };

  return {
    authenticated,
    transactions,
    transactionsStatus,
    transactionsError,
    login,
    logout,
    createTransfer,
    retryTransactions: loadTransactions,
    ...navigation,
  };
}
