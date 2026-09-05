/* global describe, test, expect, jest */
jest.mock('@expo/vector-icons', () => ({ Ionicons: 'Ionicons' }));
jest.mock('react-native', () => ({
  Pressable: 'Pressable',
  Text: 'Text',
  View: 'View',
  StyleSheet: { create: styles => styles },
}));

const { BottomNav } = require('../BottomNav');

const childrenOf = node => (Array.isArray(node?.props?.children) ? node.props.children : [node?.props?.children]).filter(Boolean);

describe('BottomNav', () => {
  test('exposes five accessible tabs and marks the active one', () => {
    const tree = BottomNav({ active: 'activity', onChange: jest.fn() });
    const tabs = childrenOf(tree).flat();

    expect(tabs).toHaveLength(5);
    expect(tabs.map(tab => tab.props.accessibilityLabel)).toEqual(['Inicio', 'Actividad', 'Enviar', 'Tarjetas', 'Perfil']);
    expect(tabs.find(tab => tab.props.accessibilityLabel === 'Actividad').props.accessibilityState).toEqual({ selected: true });
  });

  test('navigates to the selected tab', () => {
    const onChange = jest.fn();
    const tabs = childrenOf(BottomNav({ active: 'home', onChange })).flat();

    tabs.find(tab => tab.props.accessibilityLabel === 'Enviar').props.onPress();

    expect(onChange).toHaveBeenCalledWith('transfer');
  });
});
