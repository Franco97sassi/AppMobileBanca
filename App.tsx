import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
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
  const { authenticated, screen, transactions, transactionsStatus, transactionsError, login, logout, navigate, createTransfer, retryTransactions } = useBankingDemo();
  if (!authenticated) return <SafeAreaView style={styles.login}><StatusBar style="light" /><LoginScreen onLogin={login} /></SafeAreaView>;
  if (transactionsStatus === 'loading' && transactions.length === 0) return <SafeAreaView style={styles.center}><ActivityIndicator color={colors.green} /><Text style={styles.message}>Preparando tu espacio financiero…</Text></SafeAreaView>;
  if (transactionsStatus === 'error' && transactions.length === 0) return <SafeAreaView style={styles.center}><Text style={styles.error}>{transactionsError}</Text><Pressable accessibilityRole="button" onPress={() => void retryTransactions()} style={styles.retry}><Text style={styles.retryText}>Reintentar</Text></Pressable></SafeAreaView>;
  const content = screen === 'home' ? <HomeScreen transactions={transactions} goTransfer={() => navigate('transfer')} goActivity={() => navigate('activity')} /> : screen === 'activity' ? <ActivityScreen transactions={transactions} /> : screen === 'transfer' ? <TransferScreen onDone={createTransfer} /> : screen === 'cards' ? <CardsScreen /> : <ProfileScreen logout={logout} />;
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><StatusBar style="dark" /><View style={styles.body}>{content}</View><BottomNav active={screen} onChange={navigate} /></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.canvas }, login: { flex: 1, backgroundColor: '#071F1A' }, body: { flex: 1 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.canvas, padding: 28 }, message: { marginTop: 14, color: colors.muted }, error: { color: colors.red, textAlign: 'center', lineHeight: 21 }, retry: { marginTop: 18, borderRadius: 14, backgroundColor: colors.green, paddingHorizontal: 22, paddingVertical: 12 }, retryText: { color: colors.white, fontWeight: '700' } });
