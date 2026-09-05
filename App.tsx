import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from './src/components/BottomNav';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { CardsScreen } from './src/screens/CardsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TransferScreen } from './src/screens/TransferScreen';
import { AppStateProvider, useAppState } from './src/state/AppState';
import { colors } from './src/theme';

export default function App() {
  return <AppStateProvider><AppContent /></AppStateProvider>;
}

function AppContent() {
  const { authenticated, banking, dispatchBanking, login, logout, navigate, screen } = useAppState();
  if (!authenticated) return <SafeAreaView style={styles.login}><StatusBar style="light" /><LoginScreen onLogin={login} /></SafeAreaView>;

  const mainAccount = banking.accounts.find(account => account.id === 'main');
  const content = screen === 'home'
    ? <HomeScreen accounts={banking.accounts} transactions={banking.transactions} goTransfer={() => navigate('transfer')} goActivity={() => navigate('activity')} />
    : screen === 'activity'
      ? <ActivityScreen transactions={banking.transactions} />
      : screen === 'transfer' && mainAccount
        ? <TransferScreen account={mainAccount} onDone={payload => dispatchBanking({ type: 'transfer/completed', payload })} />
        : screen === 'cards' ? <CardsScreen /> : <ProfileScreen logout={logout} />;

  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><StatusBar style="dark" /><View style={styles.body}>{content}</View><BottomNav active={screen} onChange={navigate} /></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.canvas },
  login: { flex: 1, backgroundColor: '#071F1A' },
  body: { flex: 1 },
});
