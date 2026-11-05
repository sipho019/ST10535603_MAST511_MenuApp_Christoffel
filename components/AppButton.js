import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styles/theme';

const BUTTON_COLORS = { primary: COLORS.primary, dark: COLORS.dark, danger: COLORS.danger };

export default function AppButton({ title, onPress, variant = 'primary' }) {
  const backgroundColor = BUTTON_COLORS[variant];

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.medium,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  text: { color: COLORS.textOnDark, fontWeight: 'bold' },
});