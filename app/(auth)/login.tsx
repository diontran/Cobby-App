import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { Link } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ 
          uri: 'https://i.imgur.com/PxZHPpN.jpg'
        }}
        style={styles.background}
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text variant="displaySmall" style={styles.title}>
              Cobby
            </Text>
            <Text variant="titleMedium" style={styles.subtitle}>
              Master the art of card games
            </Text>

            <View style={styles.form}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
                textColor="#FFFFFF"
                theme={{
                  colors: {
                    primary: '#FFA726',
                    background: '#1E1E1E',
                    error: '#FF9B7A',
                  },
                }}
              />
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode="outlined"
                style={styles.input}
                textColor="#FFFFFF"
                theme={{
                  colors: {
                    primary: '#FFA726',
                    background: '#1E1E1E',
                    error: '#FF9B7A',
                  },
                }}
              />

              {error ? (
                <Text style={styles.error}>{error}</Text>
              ) : null}

              <Button
                mode="contained"
                onPress={handleLogin}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                loading={loading}
              >
                Sign In
              </Button>

              <Link href="/register" asChild>
                <Button
                  mode="text"
                  style={styles.linkButton}
                  textColor="#FFB74D"
                >
                  Create an account
                </Button>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#999999',
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderColor: '#2A2A2A',
  },
  error: {
    color: '#FF9B7A',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA726',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  linkButton: {
    marginTop: 16,
    color: '#FFB74D',
  },
}); 