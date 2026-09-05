/* global describe, expect, it */
import { InMemoryBankingRepository } from '../InMemoryBankingRepository';

const command = { beneficiaryName: 'Ana Ruiz', amount: 25, concept: 'Cena', idempotencyKey: 'transfer-1' };

describe('InMemoryBankingRepository', () => {
  it('creates an operation once when an idempotency key is retried', async () => {
    const repository = new InMemoryBankingRepository({ latencyMs: 0 });
    const first = await repository.createTransfer(command);
    const retry = await repository.createTransfer(command);
    expect(retry).toBe(first);
    expect((await repository.getTransactions()).filter(item => item.id === command.idempotencyKey)).toHaveLength(1);
  });

  it('also deduplicates concurrent requests', async () => {
    const repository = new InMemoryBankingRepository({ latencyMs: 1 });
    const [first, second] = await Promise.all([
      repository.createTransfer(command), repository.createTransfer(command),
    ]);
    expect(second).toBe(first);
    expect((await repository.getTransactions()).filter(item => item.id === command.idempotencyKey)).toHaveLength(1);
  });

  it('reports network failures and recovers on retry', async () => {
    const repository = new InMemoryBankingRepository({ latencyMs: 0, failNextRequest: true });
    await expect(repository.getTransactions()).rejects.toMatchObject({ code: 'NETWORK' });
    await expect(repository.getTransactions()).resolves.toEqual(expect.any(Array));
  });

  it('supports cancellation without creating the transfer', async () => {
    const repository = new InMemoryBankingRepository({ latencyMs: 20 });
    const controller = new AbortController();
    const request = repository.createTransfer(command, controller.signal);
    controller.abort();
    await expect(request).rejects.toMatchObject({ code: 'ABORTED' });
    expect((await repository.getTransactions()).some(item => item.id === command.idempotencyKey)).toBe(false);
  });
});
