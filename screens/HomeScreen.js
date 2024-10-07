import React, { useState, useEffect } from 'react';
import { TextInput, Button, FlatList, View, Text } from 'react-native';
import { auth, firestore } from './firebase';

export default function HomeScreen({ navigation }) {
  const [toDoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState('');

  const user = auth.currentUser;  // Get current logged-in user

  useEffect(() => {
    if (user) {
      // Fetch to-dos from Firestore for the current user
      const unsubscribe = firestore.collection('todos')
        .doc(user.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            setToDoList(doc.data().todos || []);
          }
        });

      return () => unsubscribe();
    }
  }, [user]);

  const addToDo = () => {
    if (newToDo.trim().length === 0) return;

    const updatedToDoList = [...toDoList, newToDo];
    setToDoList(updatedToDoList);
    setNewToDo('');

    // Save updated to-dos to Firestore
    firestore.collection('todos').doc(user.uid).set({ todos: updatedToDoList });
  };

  return (
    <View>
      <Text>Welcome, {user.email}</Text>

      <TextInput
        placeholder="Add a new to-do"
        value={newToDo}
        onChangeText={setNewToDo}
      />
      <Button title="Add" onPress={addToDo} />

      {/* Display To-Do List */}
      <FlatList
        data={toDoList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Log Out" onPress={() => auth.signOut()} />
    </View>
  );
}
