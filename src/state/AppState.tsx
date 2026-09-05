import React, { ReactNode, createContext, useContext, useMemo, useReducer, useState } from 'react';
import { initialAccounts, initialTransactions } from '../data/demo';
import { Screen } from '../types';
import { BankingAction, BankingState, bankingReducer } from './banking';

type AppContextValue = {
  authenticated: boolean;
  screen: Screen;
  banking: BankingState;
  dispatchBanking: React.Dispatch<BankingAction>;
  login: () => void;
  logout: () => void;
  navigate: (screen: Screen) => void;
};

const initialBankingState: BankingState = { accounts: initialAccounts, transactions: initialTransactions };
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [screen, setScreen] = useState<Screen>('home');
  const [banking, dispatchBanking] = useReducer(bankingReducer, initialBankingState);
  const value = useMemo<AppContextValue>(() => ({
    authenticated,
    screen,
    banking,
    dispatchBanking,
    login: () => setAuthenticated(true),
    logout: () => { setAuthenticated(false); setScreen('home'); },
    navigate: setScreen,
  }), [authenticated, banking, screen]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useAppState debe utilizarse dentro de AppStateProvider.');
  return value;
}
