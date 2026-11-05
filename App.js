import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { COURSES } from './constants/courses';
import { validateDish } from './utils/validation';
import { calculateMenuStatistics } from './utils/statistics';
import AppButton from './components/AppButton';
import DishCard from './components/DishCard';
import CourseChips from './components/CourseChips';
import { COLORS, SPACING } from './styles/theme';

const ALL_COURSES = 'All';

const INITIAL_DISHES = [
  { id: '1', name: 'Grilled Chicken', course: 'Main Course', price: 120, description: 'Juicy grilled chicken with herbs' },
  { id: '2', name: 'Chocolate Cake', course: 'Dessert', price: 65, description: 'Rich chocolate cake' },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(ALL_COURSES);

  const clearForm = () => {
    setName(''); setCourse(''); setPrice(''); setDescription('');
    setEditingId(null);
  };

  const openAddForm = () => {
    clearForm();
    setScreen('chef');
  };

  const startEditing = (dish) => {
    setName(dish.name);
    setCourse(dish.course);
    setPrice(String(dish.price));
    setDescription(dish.description);
    setEditingId(dish.id);
    setScreen('chef');
  };

  const saveDish = () => {
    const errorMessage = validateDish({ name, course, price, description });
    if (errorMessage) {
      Alert.alert('Error', errorMessage);
      return;
    }
    const dishData = {
      name: name.trim(),
      course,
      price: Number(price),
      description: description.trim(),
    };
    if (editingId) {
      setDishes(dishes.map(dish => (dish.id === editingId ? { ...dish, ...dishData } : dish)));
      Alert.alert('Success', 'Dish updated successfully!');
    } else {
      setDishes([...dishes, { id: Date.now().toString(), ...dishData }]);
      Alert.alert('Success', 'Dish added successfully!');
    }
    clearForm();
    setScreen('view');
  };

  const confirmDelete = (dish) => {
    Alert.alert('Delete dish', `Delete "${dish.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setDishes(dishes.filter(item => item.id !== dish.id)),
      },
    ]);
  };

  const clearFilters = () => {
    setSearchText('');
    setSelectedCourse(ALL_COURSES);
  };

  const filteredDishes = dishes.filter(dish => {
    const matchesName = dish.name.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesCourse = selectedCourse === ALL_COURSES || dish.course === selectedCourse;
    return matchesName && matchesCourse;
  });
  const hasActiveFilters = searchText !== '' || selectedCourse !== ALL_COURSES;
  const stats = calculateMenuStatistics(dishes);

  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Christoffel's Menu App</Text>
        <Text style={styles.subtitle}>MAST511 - Personal Chef</Text>
        <AppButton title="View Menu" onPress={() => setScreen('view')} />
        <AppButton title="Chef Menu - Add Dish" onPress={openAddForm} />
        <AppButton title="Menu Statistics" onPress={() => setScreen('stats')} />
        <Text style={styles.footer}>Total Dishes: {dishes.length}</Text>
      </View>
    );
  }

  if (screen === 'view') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Our Menu</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by dish name"
          value={searchText}
          onChangeText={setSearchText}
        />
        <CourseChips
          options={[ALL_COURSES, ...COURSES]}
          selected={selectedCourse}
          onSelect={setSelectedCourse}
        />
        {hasActiveFilters && (
          <AppButton title="Clear search and filter" variant="dark" onPress={clearFilters} />
        )}
        <FlatList
          data={filteredDishes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DishCard dish={item} onEdit={startEditing} onDelete={confirmDelete} />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No dishes found.</Text>}
        />
        <AppButton title="Back to Home" variant="dark" onPress={() => setScreen('home')} />
      </View>
    );
  }

  if (screen === 'stats') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Menu Statistics</Text>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total menu items</Text>
          <Text style={styles.statValue}>{stats.totalItems}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average price</Text>
          <Text style={styles.statValue}>R{stats.averagePrice.toFixed(2)}</Text>
        </View>
        <Text style={styles.sectionTitle}>Items per course</Text>
        {stats.itemsPerCourse.map(item => (
          <View key={item.course} style={styles.statRow}>
            <Text style={styles.statLabel}>{item.course}</Text>
            <Text style={styles.statRowValue}>{item.count}</Text>
          </View>
        ))}
        <AppButton title="Back to Home" variant="dark" onPress={() => setScreen('home')} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{editingId ? 'Edit Dish' : 'Chef Menu'}</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
      <Text style={styles.label}>Course</Text>
      <CourseChips options={COURSES} selected={course} onSelect={setCourse} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <AppButton title={editingId ? 'Update Dish' : 'Save Dish'} onPress={saveDish} />
      <AppButton title="Back" variant="dark" onPress={() => { clearForm(); setScreen('home'); }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: COLORS.background, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 30, color: COLORS.textMuted },
  input: { borderWidth: 1, borderColor: COLORS.border, padding: 12, borderRadius: 8, marginVertical: 8 },
  label: { fontWeight: 'bold', marginTop: 8 },
  footer: { marginTop: 20, textAlign: 'center' },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginTop: SPACING.large },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: SPACING.large, marginBottom: SPACING.small },
  statCard: { backgroundColor: COLORS.card, padding: SPACING.medium, borderRadius: 10, marginVertical: SPACING.small, alignItems: 'center' },
  statLabel: { fontSize: 16 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.card, padding: SPACING.medium, borderRadius: 10, marginVertical: 4 },
  statRowValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
});