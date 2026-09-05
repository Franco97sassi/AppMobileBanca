import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BottomNav } from './src/components/BottomNav';
import { useBankingDemo } from './src/hooks/useBankingDemo';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { CardsScreen } from './src/screens/CardsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TransferScreen } from './src/screens/TransferScreen';
import { colors } from './src/theme';

export default function App() {
  const { authenticated, screen, transactions, login, logout, setScreen, addTransaction } = useBankingDemo();
  if (!authenticated) return <SafeAreaView style={styles.login}><StatusBar style="light" /><LoginScreen onLogin={login} /></SafeAreaView>;
  const content = screen === 'home' ? <HomeScreen transactions={transactions} goTransfer={() => setScreen('transfer')} goActivity={() => setScreen('activity')} /> : screen === 'activity' ? <ActivityScreen transactions={transactions} /> : screen === 'transfer' ? <TransferScreen onDone={addTransaction} /> : screen === 'cards' ? <CardsScreen /> : <ProfileScreen logout={logout} />;
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><StatusBar style="dark" /><View style={styles.body}>{content}</View><BottomNav active={screen} onChange={setScreen} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.canvas }, login: { flex: 1, backgroundColor: '#071F1A' }, body: { flex: 1 } });
