/* global describe, expect, it, jest */
import { HttpBankingRepository } from '../HttpBankingRepository';

const transaction = { id: 'key-1', title: 'Transferencia a Ana', category: 'Cena', date: 'Ahora', amount: -25, icon: 'arrow-up-outline', status: 'Completado' };
const command = { beneficiaryName: 'Ana', amount: 25, concept: 'Cena', idempotencyKey: 'key-1' };

describe('HttpBankingRepository', () => {
  it('maps transfers to the documented HTTP contract', async () => {
    const fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => transaction });
    const repository = new HttpBankingRepository({ baseUrl: 'https://api.example.test', fetch });
    await expect(repository.createTransfer(command)).resolves.toEqual(transaction);
    expect(fetch).toHaveBeenCalledWith('https://api.example.test/transfers', expect.objectContaining({
      method: 'POST', headers: expect.objectContaining({ 'Idempotency-Key': 'key-1' }), body: JSON.stringify(command),
    }));
  });

  it('loads transactions and maps non-success responses', async () => {
    const fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => [transaction] }).mockResolvedValueOnce({ ok: false, status: 503 });
    const repository = new HttpBankingRepository({ baseUrl: 'https://api.example.test', fetch });
    await expect(repository.getTransactions()).resolves.toEqual([transaction]);
    await expect(repository.getTransactions()).rejects.toMatchObject({ code: 'NETWORK' });
  });

  it('maps transport failures and external cancellation', async () => {
    const failed = new HttpBankingRepository({ baseUrl: '', fetch: jest.fn().mockRejectedValue(new Error('offline')) });
    await expect(failed.getTransactions()).rejects.toMatchObject({ code: 'NETWORK' });
    const controller = new AbortController(); controller.abort();
    await expect(failed.getTransactions(controller.signal)).rejects.toMatchObject({ code: 'ABORTED' });
  });

  it('aborts a request when its timeout expires', async () => {
    const fetch = jest.fn((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
    }));
    const repository = new HttpBankingRepository({ baseUrl: '', fetch, timeoutMs: 1 });
    await expect(repository.getTransactions()).rejects.toMatchObject({ code: 'ABORTED' });
  });
});
