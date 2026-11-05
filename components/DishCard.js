import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../styles/theme';
import AppButton from './AppButton';

export default function DishCard({ dish, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{dish.name} - R{dish.price.toFixed(2)}</Text>
      <Text style={styles.course}>{dish.course}</Text>
      <Text>{dish.description}</Text>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <AppButton title="Edit" onPress={() => onEdit(dish)} />
        </View>
        <View style={styles.actionButton}>
          <AppButton title="Delete" variant="danger" onPress={() => onDelete(dish)} />
        </View>
      </View>
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
  actions: { flexDirection: 'row', marginTop: SPACING.small },
  actionButton: { flex: 1, marginHorizontal: 4 },
});