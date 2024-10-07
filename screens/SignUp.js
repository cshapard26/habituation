import React, { useState } from 'react';
import { auth } from './firebase';
import { Button, TextInput, View, Text } from 'react-native';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        navigation.navigate('Home');  // Redirect to the home screen
      })
      .catch(err => setError(err.message));
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}
