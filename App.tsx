import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { BottomNav } from './src/components/BottomNav';
import { initialTransactions } from './src/data/demo';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { CardsScreen } from './src/screens/CardsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TransferScreen } from './src/screens/TransferScreen';
import { colors } from './src/theme';
import { Screen, Transaction } from './src/types';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false); const [screen, setScreen] = useState<Screen>('home'); const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  if (!authenticated) return <SafeAreaView style={styles.login}><StatusBar style="light" /><LoginScreen onLogin={() => setAuthenticated(true)} /></SafeAreaView>;
  const content = screen === 'home' ? <HomeScreen transactions={transactions} goTransfer={() => setScreen('transfer')} goActivity={() => setScreen('activity')} /> : screen === 'activity' ? <ActivityScreen transactions={transactions} /> : screen === 'transfer' ? <TransferScreen onDone={transaction => setTransactions(old => [transaction, ...old])} /> : screen === 'cards' ? <CardsScreen /> : <ProfileScreen logout={() => { setAuthenticated(false); setScreen('home'); }} />;
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><StatusBar style="dark" /><View style={styles.body}>{content}</View><BottomNav active={screen} onChange={setScreen} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.canvas }, login: { flex: 1, backgroundColor: '#071F1A' }, body: { flex: 1 } });
