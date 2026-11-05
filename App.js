import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';
   import { COURSES } from './constants/courses';
   import { validateDish } from './utils/validation';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [dishes, setDishes] = useState([
    { id: '1', name: 'Grilled Chicken', course: 'Main', price: '120', description: 'Juicy grilled chicken with herbs' },
    { id: '2', name: 'Chocolate Cake', course: 'Dessert', price: '65', description: 'Rich chocolate cake' },
  ]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const addDish = () => {
    if (!name || !course || !price || !description) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (isNaN(price)) {
      Alert.alert('Error', 'Price must be a number');
      return;
    }
    const newDish = { id: Date.now().toString(), name, course, price, description };
    setDishes([...dishes, newDish]);
    setName(''); setCourse(''); setPrice(''); setDescription('');
    Alert.alert('Success', 'Dish added successfully!');
    setScreen('view');
  };

  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Christoffel's Menu App</Text>
        <Text style={styles.subtitle}>MAST511 - Personal Chef</Text>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('view')}>
          <Text style={styles.buttonText}>View Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setScreen('chef')}>
          <Text style={styles.buttonText}>Chef Menu - Add Dish</Text>
        </TouchableOpacity>
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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.dishName}>{item.name} - R{item.price}</Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.backButton} onPress={() => setScreen('home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chef Menu</Text>
      <TextInput style={styles.input} placeholder="Dish Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Course (Starter/Main/Dessert)" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TouchableOpacity style={styles.button} onPress={addDish}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => setScreen('home')}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 30, color: 'gray' },
  button: { backgroundColor: '#ff6f00', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  backButton: { backgroundColor: '#333', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginVertical: 8 },
  card: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginVertical: 8 },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  course: { color: '#ff6f00', marginBottom: 5 },
  footer: { marginTop: 20, textAlign: 'center' }
});