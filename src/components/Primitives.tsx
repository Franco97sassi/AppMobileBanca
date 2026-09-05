import React, { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function Header({ title, subtitle, onBack, right }: { title: string; subtitle?: string; onBack?: () => void; right?: ReactNode }) {
  return <View style={styles.header}>
    {onBack ? <Pressable onPress={onBack} accessibilityLabel="Volver" style={styles.circle}><Ionicons name="chevron-back" size={22} color={colors.ink} /></Pressable> : <View style={styles.logo}><Text style={styles.logoText}>A</Text></View>}
    <View style={styles.headerText}><Text style={styles.title}>{title}</Text>{subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}</View>
    {right ?? <Pressable accessibilityLabel="Notificaciones" style={styles.circle}><Ionicons name="notifications-outline" size={21} color={colors.ink} /><View style={styles.dot} /></Pressable>}
  </View>;
}

export function SectionTitle({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return <View style={styles.sectionRow}><Text style={styles.section}>{children}</Text>{action && <Pressable onPress={onAction}><Text style={styles.action}>{action}</Text></Pressable>}</View>;
}

export function EmptyState({ icon, title, body }: { icon: keyof typeof Ionicons.glyphMap; title: string; body: string }) {
  return <View style={styles.empty}><View style={styles.emptyIcon}><Ionicons name={icon} size={30} color={colors.green} /></View><Text style={styles.emptyTitle}>{title}</Text><Text style={styles.emptyBody}>{body}</Text></View>;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  headerText: { flex: 1 }, title: { fontSize: 19, fontWeight: '700', color: colors.ink }, subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
  logo: { width: 40, height: 40, backgroundColor: colors.green, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: colors.accent, fontSize: 23, fontWeight: '800', fontStyle: 'italic' },
  circle: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line },
  dot: { position: 'absolute', width: 7, height: 7, borderRadius: 4, backgroundColor: colors.red, right: 9, top: 8, borderWidth: 1, borderColor: colors.white },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  section: { fontSize: 18, fontWeight: '700', color: colors.ink }, action: { color: colors.green, fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', padding: 28 }, emptyIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.softGreen, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: colors.ink, marginTop: 14 }, emptyBody: { color: colors.muted, textAlign: 'center', lineHeight: 20, marginTop: 6 },
});
