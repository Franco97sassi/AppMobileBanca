/* global describe, test, it, expect */
import { filterTransactions, isValidTransfer, parseAmount, todayLabel, transactionTotals } from '../transactions';
import { initialTransactions } from '../../data/demo';

describe('transfer validation', () => {
  test.each([['12,50', 12.5], ['12.50', 12.5], [' 10 ', 10]])('parses %s', (input, expected) => {
    expect(parseAmount(input)).toBe(expected);
  });

  test.each(['', '-10', 'abc', '1,234', '10.999'])('rejects malformed amount %s', input => {
    expect(Number.isNaN(parseAmount(input))).toBe(true);
  });

  it('requires a beneficiary, positive amount and sufficient balance', () => {
    expect(isValidTransfer('10', false)).toBe(false);
    expect(isValidTransfer('0', true)).toBe(false);
    expect(isValidTransfer('100', true, 99)).toBe(false);
    expect(isValidTransfer('99,50', true, 100)).toBe(true);
  });
});

describe('transaction helpers', () => {
  it('filters by type and searches title or category without case sensitivity', () => {
    expect(filterTransactions(initialTransactions, 'Ingresos', '')).toHaveLength(1);
    expect(filterTransactions(initialTransactions, 'Gastos', 'SPOTIFY')).toHaveLength(1);
    expect(filterTransactions(initialTransactions, 'Todos', 'alimentación')).toHaveLength(1);
  });

  it('calculates totals from the source data', () => {
    expect(transactionTotals(initialTransactions)).toEqual({ income: 2840, expenses: 347.09 });
  });

  it('formats a stable Spanish date label', () => {
    expect(todayLabel(new Date('2026-09-04T12:00:00Z'))).toMatch(/4 de septiembre/);
  });
});
