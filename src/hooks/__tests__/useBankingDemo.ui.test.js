import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useBankingDemo } from '../useBankingDemo';

const transaction = { id: 'tx-1', title: 'Demo', category: 'Prueba', date: 'Ahora', amount: -10, icon: 'arrow-up-outline', status: 'Completado' };

test('carga, autentica, transfiere y cierra la sesión', async () => {
  const repository = { getTransactions: jest.fn().mockResolvedValue([]), createTransfer: jest.fn().mockResolvedValue(transaction) };
  const { result } = renderHook(() => useBankingDemo(repository));
  await waitFor(() => expect(result.current.loading).toBe(false));
  act(() => result.current.login());
  expect(result.current.authenticated).toBe(true);
  await act(async () => result.current.transfer({ beneficiaryName: 'Ana', amount: 10, concept: '', idempotencyKey: 'tx-1' }));
  expect(result.current.transactions).toEqual([transaction]);
  act(() => { result.current.setScreen('profile'); result.current.logout(); });
  expect(result.current.authenticated).toBe(false);
  expect(result.current.screen).toBe('home');
});

test('presenta un error y permite reintentar', async () => {
  const repository = { getTransactions: jest.fn().mockRejectedValueOnce(new Error('Sin conexión')).mockResolvedValueOnce([transaction]), createTransfer: jest.fn() };
  const { result } = renderHook(() => useBankingDemo(repository));
  await waitFor(() => expect(result.current.error).toBe('Sin conexión'));
  await act(async () => result.current.retry());
  expect(result.current.error).toBeUndefined();
  expect(result.current.transactions).toEqual([transaction]);
});
