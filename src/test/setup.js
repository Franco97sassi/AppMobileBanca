jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return { Ionicons: ({ name, ...props }) => React.createElement(Text, props, name) };
});
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return { LinearGradient: ({ children, ...props }) => React.createElement(View, props, children) };
});
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return { SafeAreaView: ({ children, ...props }) => React.createElement(View, props, children) };
});

expect.extend(require('@testing-library/react-native/matchers'));
