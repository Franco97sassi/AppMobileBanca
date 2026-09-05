import { Transaction, TransferDraft } from '../types';

export interface BankingRepository {
  listTransactions(signal?: AbortSignal): Promise<Transaction[]>;
  createTransfer(draft: TransferDraft, idempotencyKey: string): Promise<Transaction>;
}
