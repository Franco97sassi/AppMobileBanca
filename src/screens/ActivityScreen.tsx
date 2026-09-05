import React, { useMemo, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Transaction } from '../types';
import { colors } from '../theme';
import { Header } from '../components/Primitives';
import { TransactionRow } from '../components/TransactionRow';
import { filterTransactions, transactionTotals } from '../domain/transactions';
import { money } from '../data/demo';

export function ActivityScreen({ transactions }: { transactions: Transaction[] }) {
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('Todos');
  const shown = useMemo(() => filterTransactions(transactions, filter, query), [filter, query, transactions]);
  const totals = useMemo(() => transactionTotals(transactions), [transactions]);
  return <ScrollView contentContainerStyle={styles.content}><Header title="Actividad" subtitle="Todos tus movimientos" />
    <View style={styles.search}><Ionicons name="search-outline" size={19} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Buscar movimientos" placeholderTextColor={colors.muted} style={styles.input} /></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{['Todos', 'Ingresos', 'Gastos'].map(value => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.chip, filter === value && styles.chipActive]}><Text style={[styles.chipText, filter === value && styles.chipTextActive]}>{value}</Text></Pressable>)}</ScrollView>
    <View style={styles.summary}><View><Text style={styles.summaryLabel}>Ingresos del período</Text><Text style={styles.income}>+ {money(totals.income)}</Text></View><View><Text style={styles.summaryLabel}>Gastos</Text><Text style={styles.expense}>− {money(totals.expenses)}</Text></View></View>
    <Text style={styles.month}>SEPTIEMBRE</Text><View style={styles.list}>{shown.map(item => <TransactionRow key={item.id} item={item} />)}{shown.length === 0 && <Text style={styles.none}>No se encontraron movimientos.</Text>}</View>
  </ScrollView>;
}
const styles = StyleSheet.create({ content: { paddingBottom: 30 }, search: { marginHorizontal: 20, marginTop: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white, borderRadius: 14, paddingHorizontal: 14 }, input: { flex: 1, height: 48, paddingLeft: 9, color: colors.ink }, filters: { paddingHorizontal: 20, paddingVertical: 14, gap: 8 }, chip: { paddingHorizontal: 18, paddingVertical: 9, borderRadius: 20, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line }, chipActive: { backgroundColor: colors.green }, chipText: { color: colors.muted, fontWeight: '600', fontSize: 12 }, chipTextActive: { color: colors.white }, summary: { marginHorizontal: 20, padding: 17, backgroundColor: '#F2E7CF', borderRadius: 18, flexDirection: 'row', justifyContent: 'space-between' }, summaryLabel: { fontSize: 11, color: colors.muted }, income: { marginTop: 5, color: '#187552', fontWeight: '700' }, expense: { marginTop: 5, color: colors.red, fontWeight: '700', textAlign: 'right' }, month: { margin: 20, marginBottom: 5, color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 1.2 }, list: { marginHorizontal: 20, backgroundColor: colors.white, paddingHorizontal: 16, borderRadius: 20 }, none: { color: colors.muted, padding: 30, textAlign: 'center' } });
