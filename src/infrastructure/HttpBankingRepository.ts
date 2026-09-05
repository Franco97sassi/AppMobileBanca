import { BankingError, BankingRepository, TransferCommand } from '../domain/banking';
import { Transaction } from '../types';

type Fetch = typeof globalThis.fetch;
type Options = { baseUrl: string; fetch?: Fetch; timeoutMs?: number };

/** Production-facing adapter. Authentication is deliberately supplied by the host fetch client. */
export class HttpBankingRepository implements BankingRepository {
  private readonly fetch: Fetch;
  private readonly timeoutMs: number;

  constructor(private readonly options: Options) {
    this.fetch = options.fetch ?? globalThis.fetch;
    this.timeoutMs = options.timeoutMs ?? 8_000;
  }

  async getTransactions(signal?: AbortSignal): Promise<Transaction[]> {
    return this.request<Transaction[]>('/transactions', { method: 'GET' }, signal);
  }

  async createTransfer(command: TransferCommand, signal?: AbortSignal): Promise<Transaction> {
    return this.request<Transaction>('/transfers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': command.idempotencyKey },
      body: JSON.stringify(command),
    }, signal);
  }

  private async request<T>(path: string, init: RequestInit, externalSignal?: AbortSignal): Promise<T> {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (externalSignal?.aborted) abort();
    else externalSignal?.addEventListener('abort', abort, { once: true });
    const timeout = setTimeout(abort, this.timeoutMs);
    try {
      const response = await this.fetch(`${this.options.baseUrl}${path}`, { ...init, signal: controller.signal });
      if (!response.ok) throw new BankingError('NETWORK', `La operación falló (${response.status}).`);
      return await response.json() as T;
    } catch (reason) {
      if (controller.signal.aborted) throw new BankingError('ABORTED', 'Operación cancelada o fuera de tiempo.');
      if (reason instanceof BankingError) throw reason;
      throw new BankingError('NETWORK', 'No pudimos conectar. Inténtalo de nuevo.');
    } finally {
      clearTimeout(timeout);
      externalSignal?.removeEventListener('abort', abort);
    }
  }
}
