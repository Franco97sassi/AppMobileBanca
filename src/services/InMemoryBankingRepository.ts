import { initialTransactions } from '../data/demo';
import { BankingRepository } from './BankingRepository';
import { Transaction, TransferDraft } from '../types';

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

export class InMemoryBankingRepository implements BankingRepository {
  private transactions: Transaction[];
  private readonly completedRequests = new Map<string, Transaction>();

  constructor(seed: Transaction[] = initialTransactions, private readonly latency = 250) {
    this.transactions = [...seed];
  }

  async listTransactions(signal?: AbortSignal) {
    await wait(this.latency);
    if (signal?.aborted) {
      const error = new Error('Request aborted');
      error.name = 'AbortError';
      throw error;
    }
    return [...this.transactions];
  }

  async createTransfer(draft: TransferDraft, idempotencyKey: string) {
    const completed = this.completedRequests.get(idempotencyKey);
    if (completed) return completed;
    await wait(this.latency);
    const transaction: Transaction = {
      id: `transfer-${Date.now()}`,
      title: `Transferencia a ${draft.beneficiary.name}`,
      category: draft.concept || 'Transferencias',
      date: 'Ahora',
      amount: -draft.amount,
      icon: 'arrow-up-outline',
      status: 'Completado',
    };
    this.transactions = [transaction, ...this.transactions];
    this.completedRequests.set(idempotencyKey, transaction);
    return transaction;
  }
}
