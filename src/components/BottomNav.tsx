import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../types';
import { colors } from '../theme';

const items: { id: Screen; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'home', label: 'Inicio', icon: 'home-outline' }, { id: 'activity', label: 'Actividad', icon: 'receipt-outline' },
  { id: 'transfer', label: 'Enviar', icon: 'swap-horizontal-outline' }, { id: 'cards', label: 'Tarjetas', icon: 'card-outline' },
  { id: 'profile', label: 'Perfil', icon: 'person-outline' },
];

export function BottomNav({ active, onChange }: { active: Screen; onChange: (screen: Screen) => void }) {
  return <View style={styles.nav}>{items.map(item => {
    const selected = active === item.id;
    return <Pressable key={item.id} onPress={() => onChange(item.id)} style={[styles.item, item.id === 'transfer' && styles.mainItem]} accessibilityRole="tab" accessibilityLabel={item.label} accessibilityState={{ selected }}>
      <View style={item.id === 'transfer' ? styles.mainButton : undefined}><Ionicons name={item.icon} size={item.id === 'transfer' ? 25 : 22} color={item.id === 'transfer' ? colors.accent : selected ? colors.green : '#87928E'} /></View>
      <Text style={[styles.label, selected && styles.selected, item.id === 'transfer' && styles.sendLabel]}>{item.label}</Text>
    </Pressable>;
  })}</View>;
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', backgroundColor: colors.white, borderTopWidth: 1, borderColor: colors.line, paddingHorizontal: 8, paddingTop: 8, paddingBottom: 6 },
  item: { flex: 1, alignItems: 'center', gap: 4, paddingTop: 3 }, mainItem: { marginTop: -27 },
  mainButton: { width: 58, height: 58, borderRadius: 20, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: colors.canvas },
  label: { color: '#87928E', fontSize: 10, fontWeight: '600' }, selected: { color: colors.green }, sendLabel: { color: colors.green },
});
