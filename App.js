import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
import { COURSES } from './constants/courses';
import { validateDish } from './utils/validation';
import AppButton from './components/AppButton';
import DishCard from './components/DishCard';
import { COLORS } from './styles/theme';

export default function App() {
  const [screen, setScreen] = useState('home');
    const [dishes, setDishes] = useState([
    { id: '1', name: 'Grilled Chicken', course: 'Main Course', price: 120, description: 'Juicy grilled chicken with herbs' },
    { id: '2', name: 'Chocolate Cake', course: 'Dessert', price: 65, description: 'Rich chocolate cake' },
  ]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

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
      const startEditing = (dish) => {
    setName(dish.name);
    setCourse(dish.course);
    setPrice(String(dish.price));
    setDescription(dish.description);
    setEditingId(dish.id);
    setScreen('chef');
  };
    const clearForm = () => {
    setName(''); setCourse(''); setPrice(''); setDescription('');
    setEditingId(null);
  };

  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Christoffel's Menu</Text>
        <Text style={styles.subtitle}>Personal Chef</Text>
           <AppButton title="View Menu" onPress={() => setScreen('view')} />
            <AppButton title="Chef Menu - Add Dish" onPress={() => setScreen('chef')} />
        <Text style={styles.footer}>Total Dishes: {dishes.length}</Text>
      </View>
    );
  }

   if (screen === 'view') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Our Menu</Text>
        <FlatList
          data={dishes}
          keyExtractor={item => item.id}
         renderItem={({ item }) => <DishCard dish={item} onEdit={startEditing} onDelete={confirmDelete} />}
        />
        <AppButton title="Back to Home" variant="dark" onPress={() => setScreen('home')} />
      </View>
    );
  }

    return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{editingId ? 'Edit Dish' : 'Chef Menu'}</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />

      <Text style={styles.label}>Course</Text>
      <View style={styles.courseRow}>
        {COURSES.map(courseOption => (
          <TouchableOpacity
            key={courseOption}
            style={[styles.courseChip, course === courseOption && styles.courseChipSelected]}
            onPress={() => setCourse(courseOption)}
          >
            <Text style={course === courseOption ? styles.courseChipTextSelected : styles.courseChipText}>
              {courseOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  courseRow: { flexDirection: 'row', marginVertical: 8 },
  courseChip: { borderWidth: 1, borderColor: COLORS.primary, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, marginRight: 8 },
  courseChipSelected: { backgroundColor: COLORS.primary },
  courseChipText: { color: COLORS.primary },
  courseChipTextSelected: { color: COLORS.textOnDark, fontWeight: 'bold' },
  footer: { marginTop: 20, textAlign: 'center' },
});