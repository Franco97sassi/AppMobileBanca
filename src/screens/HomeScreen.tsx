import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { money } from '../data/demo';
import { totalBalance } from '../state/banking';
import { Account, Transaction } from '../types';
import { colors } from '../theme';
import { Header, SectionTitle } from '../components/Primitives';
import { TransactionRow } from '../components/TransactionRow';

export function HomeScreen({ accounts, transactions, goTransfer, goActivity }: { accounts: Account[]; transactions: Transaction[]; goTransfer: () => void; goActivity: () => void }) {
  const [hidden, setHidden] = useState(false);
  return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
    <Header title="Hola, Daniela" subtitle="Viernes, 4 de septiembre" />
    <View style={styles.heading}><Text style={styles.eyebrow}>PATRIMONIO TOTAL</Text><View style={styles.balanceLine}><Text style={styles.total}>{hidden ? '••••••' : money(totalBalance(accounts))}</Text><Pressable onPress={() => setHidden(v => !v)} accessibilityLabel="Mostrar u ocultar saldo"><Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={21} color={colors.muted} /></Pressable></View><Text style={styles.growth}>↗  4,8% este mes</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={Dimensions.get('window').width - 42} decelerationRate="fast" contentContainerStyle={styles.accountList}>
      {accounts.map(account => <LinearGradient key={account.id} colors={account.color} style={styles.card}>
        <View style={styles.cardTop}><Text style={styles.cardName}>{account.name}</Text><Ionicons name="wifi-outline" size={20} color="#FFFFFFAA" /></View>
        <Text style={styles.cardBalance}>{hidden ? '••••••' : money(account.balance, account.currency)}</Text>
        <View style={styles.cardBottom}><Text style={styles.cardNumber}>{account.number}</Text><Text style={styles.cardBrand}>ÁUREA</Text></View>
      </LinearGradient>)}
    </ScrollView>
    <View style={styles.quickWrap}><SectionTitle>Acciones rápidas</SectionTitle><View style={styles.quickRow}>
      <Quick icon="arrow-up-outline" label="Enviar" onPress={goTransfer} />
      <Quick icon="arrow-down-outline" label="Ingresar" />
      <Quick icon="document-text-outline" label="Recibos" />
      <Quick icon="ellipsis-horizontal" label="Más" />
    </View></View>
    <View style={styles.panel}><SectionTitle action="Ver todo" onAction={goActivity}>Últimos movimientos</SectionTitle>{transactions.slice(0, 4).map(item => <TransactionRow key={item.id} item={item} />)}</View>
    <View style={styles.insight}><View style={styles.insightIcon}><Ionicons name="sparkles-outline" size={22} color={colors.green} /></View><View style={styles.insightCopy}><Text style={styles.insightTitle}>Tu resumen inteligente</Text><Text style={styles.insightBody}>Has gastado un 12% menos que el mes pasado. ¡Buen trabajo!</Text></View><Ionicons name="chevron-forward" size={18} color={colors.muted} /></View>
  </ScrollView>;
}

function Quick({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={styles.quick}><View style={styles.quickIcon}><Ionicons name={icon} size={21} color={colors.green} /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  content: { paddingBottom: 30 }, heading: { paddingHorizontal: 20, paddingTop: 14 }, eyebrow: { fontSize: 11, letterSpacing: 1.5, fontWeight: '700', color: colors.muted },
  balanceLine: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 5 }, total: { fontSize: 32, color: colors.ink, fontWeight: '800', letterSpacing: -.7 }, growth: { color: '#187552', fontSize: 12, fontWeight: '600', marginTop: 4 },
  accountList: { paddingHorizontal: 20, paddingVertical: 22, gap: 12 }, card: { width: Dimensions.get('window').width - 54, height: 172, borderRadius: 24, padding: 22, justifyContent: 'space-between' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between' }, cardName: { color: '#FFFFFFBB', fontSize: 13 }, cardBalance: { color: colors.white, fontWeight: '700', fontSize: 27 }, cardBottom: { flexDirection: 'row', justifyContent: 'space-between' }, cardNumber: { color: '#FFFFFFAA', letterSpacing: 2 }, cardBrand: { color: colors.accent, fontWeight: '800', letterSpacing: 1.5 },
  quickWrap: { paddingHorizontal: 20 }, quickRow: { flexDirection: 'row', justifyContent: 'space-between' }, quick: { alignItems: 'center', gap: 8, width: '23%' }, quickIcon: { width: 52, height: 52, borderRadius: 17, backgroundColor: colors.white, borderColor: colors.line, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }, quickLabel: { fontSize: 12, color: colors.ink, fontWeight: '600' },
  panel: { margin: 20, padding: 16, backgroundColor: colors.white, borderRadius: 22, borderWidth: 1, borderColor: colors.line },
  insight: { marginHorizontal: 20, backgroundColor: '#F2E7CF', padding: 16, borderRadius: 18, flexDirection: 'row', alignItems: 'center' }, insightIcon: { width: 42, height: 42, backgroundColor: '#FFFFFF88', borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, insightCopy: { flex: 1, paddingHorizontal: 12 }, insightTitle: { color: colors.ink, fontWeight: '700' }, insightBody: { color: '#5D655F', fontSize: 12, lineHeight: 17, marginTop: 3 },
});
