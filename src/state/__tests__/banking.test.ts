import { describe, expect, it } from '@jest/globals';
import { beneficiaries, initialAccounts, initialTransactions } from '../../data/demo';
import { bankingReducer, totalBalance, transactionTotals } from '../banking';

const initialState = { accounts: initialAccounts, transactions: initialTransactions };

describe('bankingReducer', () => {
  it('descuenta el importe y registra el movimiento al completar una transferencia', () => {
    const result = bankingReducer(initialState, {
      type: 'transfer/completed',
      payload: { beneficiary: beneficiaries[0]!, amount: 125.5, concept: 'Cena', id: 'test-id', date: 'Ahora' },
    });

    expect(result.accounts.find(account => account.id === 'main')?.balance).toBe(12715.15);
    expect(result.transactions[0]).toMatchObject({ id: 'test-id', amount: -125.5, category: 'Cena' });
    expect(initialState.accounts[0]?.balance).toBe(12840.65);
  });

  it.each([0, -10, Number.NaN, 20000])('rechaza un importe no válido: %s', amount => {
    const result = bankingReducer(initialState, {
      type: 'transfer/completed',
      payload: { beneficiary: beneficiaries[0]!, amount },
    });
    expect(result).toBe(initialState);
  });

  it('usa la categoría predeterminada cuando el concepto está vacío', () => {
    const result = bankingReducer(initialState, {
      type: 'transfer/completed',
      payload: { beneficiary: beneficiaries[1]!, amount: 10, concept: '   ', id: 'transfer' },
    });
    expect(result.transactions[0]?.category).toBe('Transferencias');
  });

  it('restablece el estado de la demo', () => {
    const changed = { accounts: [], transactions: [] };
    expect(bankingReducer(initialState, { type: 'demo/reset', payload: changed })).toBe(changed);
  });
});

describe('selectores bancarios', () => {
  it('calcula el patrimonio a partir de las cuentas', () => {
    expect(totalBalance(initialAccounts)).toBeCloseTo(18110.85);
  });

  it('calcula ingresos y gastos a partir de los movimientos', () => {
    expect(transactionTotals(initialTransactions)).toEqual({ income: 2840, expenses: 347.09 });
  });
});
