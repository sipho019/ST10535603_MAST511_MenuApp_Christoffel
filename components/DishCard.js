import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styles/theme';

export default function DishCard({ dish }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{dish.name} - R{dish.price.toFixed(2)}</Text>
      <Text style={styles.course}>{dish.course}</Text>
      <Text>{dish.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    padding: SPACING.medium,
    borderRadius: 10,
    marginVertical: SPACING.small,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  course: { color: COLORS.primary, marginBottom: 5 },
});