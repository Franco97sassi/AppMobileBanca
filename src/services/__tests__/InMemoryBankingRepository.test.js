/* global describe, it, expect */
import { beneficiaries } from '../../data/demo';
import { InMemoryBankingRepository } from '../InMemoryBankingRepository';

describe('InMemoryBankingRepository', () => {
  it('returns defensive copies of its transaction list', async () => {
    const repository = new InMemoryBankingRepository([], 0);
    const first = await repository.listTransactions();
    first.push({ id: 'external' });
    expect(await repository.listTransactions()).toEqual([]);
  });

  it('creates a transfer and exposes it in subsequent reads', async () => {
    const repository = new InMemoryBankingRepository([], 0);
    const transaction = await repository.createTransfer({ beneficiary: beneficiaries[0], amount: 25.5, concept: 'Cena' }, 'request-1');
    expect(transaction).toMatchObject({ amount: -25.5, category: 'Cena', status: 'Completado' });
    expect(await repository.listTransactions()).toEqual([transaction]);
  });

  it('makes repeated requests with the same key idempotent', async () => {
    const repository = new InMemoryBankingRepository([], 0);
    const draft = { beneficiary: beneficiaries[0], amount: 10, concept: '' };
    const first = await repository.createTransfer(draft, 'same-key');
    const repeated = await repository.createTransfer(draft, 'same-key');
    expect(repeated).toBe(first);
    expect(await repository.listTransactions()).toHaveLength(1);
  });

  it('honors cancellation when loading data', async () => {
    const repository = new InMemoryBankingRepository([], 0);
    const controller = new AbortController();
    controller.abort();
    await expect(repository.listTransactions(controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
  });
});
