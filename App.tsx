import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomNav } from './src/components/BottomNav';
import { useBankingDemo } from './src/hooks/useBankingDemo';
import { ActivityScreen } from './src/screens/ActivityScreen';
import { CardsScreen } from './src/screens/CardsScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { TransferScreen } from './src/screens/TransferScreen';
import { colors } from './src/theme';
import { screenFromUrl } from './src/navigation/routes';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const { authenticated, screen, transactions, loading, error, login, logout, setScreen, transfer, retry } = useBankingDemo();
  useEffect(() => {
    const openUrl = ({ url }: { url: string }) => {
      const route = screenFromUrl(url);
      if (route) setScreen(route);
    };
    const subscription = Linking.addEventListener('url', openUrl);
    void Linking.getInitialURL().then(url => url && openUrl({ url }));
    return () => subscription.remove();
  }, [setScreen]);
  if (!authenticated) return <SafeAreaView style={styles.login}><StatusBar style="light" /><LoginScreen onLogin={login} /></SafeAreaView>;
  if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator color={colors.green} /><Text style={styles.message}>Cargando tus movimientos…</Text></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.center}><Text style={styles.errorTitle}>No pudimos cargar tus datos</Text><Text style={styles.message}>{error}</Text><Pressable accessibilityRole="button" onPress={() => void retry()} style={styles.retry}><Text style={styles.retryText}>Reintentar</Text></Pressable></SafeAreaView>;
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}><StatusBar style="dark" /><AppNavigator initialScreen="home" screen={screen} onScreenChange={setScreen}>{(active, navigate) => {
    const screens = {
      home: <HomeScreen transactions={transactions} goTransfer={() => navigate('transfer')} goActivity={() => navigate('activity')} />,
      activity: <ActivityScreen transactions={transactions} />,
      transfer: <TransferScreen onSubmit={transfer} />,
      cards: <CardsScreen />,
      profile: <ProfileScreen logout={logout} />,
    } satisfies Record<typeof active, React.ReactNode>;
    const content = screens[active];
    return <><View style={styles.body}>{content}</View><BottomNav active={active} onChange={navigate} /></>;
  }}</AppNavigator></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: colors.canvas }, login: { flex: 1, backgroundColor: '#071F1A' }, body: { flex: 1 }, center: { flex: 1, backgroundColor: colors.canvas, alignItems: 'center', justifyContent: 'center', padding: 24 }, message: { color: colors.muted, textAlign: 'center', marginTop: 12 }, errorTitle: { color: colors.ink, fontWeight: '800', fontSize: 20 }, retry: { backgroundColor: colors.green, borderRadius: 14, paddingHorizontal: 22, paddingVertical: 13, marginTop: 20 }, retryText: { color: colors.white, fontWeight: '700' } });
