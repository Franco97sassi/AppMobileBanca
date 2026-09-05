import { Transaction } from '../types';

export type TransferCommand = {
  beneficiaryName: string;
  amount: number;
  concept: string;
  idempotencyKey: string;
};

export type BankingErrorCode = 'NETWORK' | 'ABORTED';

export class BankingError extends Error {
  constructor(public readonly code: BankingErrorCode, message: string) {
    super(message);
    this.name = 'BankingError';
  }
}

/** Port implemented by local fixtures today and by an HTTP adapter in production. */
export interface BankingRepository {
  getTransactions(signal?: AbortSignal): Promise<Transaction[]>;
  createTransfer(command: TransferCommand, signal?: AbortSignal): Promise<Transaction>;
}
