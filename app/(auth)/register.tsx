import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as PaperTextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      await signUp(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <PaperTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      
      <PaperTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        style={styles.button}
      >
        Sign Up
      </Button>
      
      <Link href="/(auth)/login" asChild>
        <Button mode="text">Already have an account? Login</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 