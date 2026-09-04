import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { Transaction } from '../types';
import { colors } from '../theme';
import { money } from '../data/demo';

export function TransactionRow({ item }: { item: Transaction }) {
  const income = item.amount > 0;
  return <View style={styles.row}>
    <View style={[styles.icon, income && styles.incomeIcon]}><Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color={income ? colors.green : colors.ink} /></View>
    <View style={styles.copy}><Text style={styles.title}>{item.title}</Text><Text style={styles.meta}>{item.category} · {item.date}</Text></View>
    <View style={styles.amountBox}><Text style={[styles.amount, income && styles.income]}>{income ? '+' : ''}{money(item.amount)}</Text><Text style={styles.status}>{item.status}</Text></View>
  </View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#F0F1EE', alignItems: 'center', justifyContent: 'center' }, incomeIcon: { backgroundColor: colors.softGreen },
  copy: { flex: 1, marginLeft: 12 }, title: { color: colors.ink, fontWeight: '600', fontSize: 14 }, meta: { color: colors.muted, fontSize: 11, marginTop: 4 },
  amountBox: { alignItems: 'flex-end' }, amount: { color: colors.ink, fontWeight: '700', fontSize: 14 }, income: { color: '#187552' }, status: { color: colors.muted, fontSize: 10, marginTop: 4 },
});
