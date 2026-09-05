import { initialTransactions } from '../data/demo';
import { BankingError, BankingRepository, TransferCommand } from '../domain/banking';
import { Transaction } from '../types';

type Options = { latencyMs?: number; failNextRequest?: boolean };

export class InMemoryBankingRepository implements BankingRepository {
  private transactions = [...initialTransactions];
  private transfers = new Map<string, Transaction>();
  private failNextRequest: boolean;
  private readonly latencyMs: number;

  constructor({ latencyMs = 450, failNextRequest = false }: Options = {}) {
    this.latencyMs = latencyMs;
    this.failNextRequest = failNextRequest;
  }

  async getTransactions(signal?: AbortSignal) {
    await this.delay(signal);
    return [...this.transactions];
  }

  async createTransfer(command: TransferCommand, signal?: AbortSignal) {
    const previous = this.transfers.get(command.idempotencyKey);
    if (previous) return previous;
    await this.delay(signal);
    // A concurrent request may have completed while this one was awaiting I/O.
    const concurrent = this.transfers.get(command.idempotencyKey);
    if (concurrent) return concurrent;
    const transaction: Transaction = {
      id: command.idempotencyKey,
      title: `Transferencia a ${command.beneficiaryName}`,
      category: command.concept || 'Transferencias',
      date: 'Ahora',
      amount: -command.amount,
      icon: 'arrow-up-outline',
      status: 'Completado',
    };
    this.transfers.set(command.idempotencyKey, transaction);
    this.transactions.unshift(transaction);
    return transaction;
  }

  private delay(signal?: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
      if (signal?.aborted) return reject(new BankingError('ABORTED', 'Operación cancelada'));
      const timer = setTimeout(() => {
        signal?.removeEventListener('abort', abort);
        if (this.failNextRequest) {
          this.failNextRequest = false;
          reject(new BankingError('NETWORK', 'No pudimos conectar. Inténtalo de nuevo.'));
        } else resolve();
      }, this.latencyMs);
      const abort = () => {
        clearTimeout(timer);
        reject(new BankingError('ABORTED', 'Operación cancelada'));
      };
      signal?.addEventListener('abort', abort, { once: true });
    });
  }
}
