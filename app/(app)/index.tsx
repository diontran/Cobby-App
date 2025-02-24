import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, ImageBackground, Pressable, Image } from 'react-native';
import { Card, Text, ActivityIndicator, Button } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { getCardGames } from '../../services/games';
import type { CardGame } from '../../types/game';

function HomeScreen() {
  const { authState } = useAuth();
  const router = useRouter();
  const [games, setGames] = useState<CardGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const loadGames = async () => {
    try {
      const data = await getCardGames();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadGames();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadGames();
  }, []);

  const handleGamePress = (game: CardGame) => {
    router.push(`/game/${game.id}`);
  };

  const handleImageLoad = (gameId: string) => {
    setLoadedImages(prev => ({ ...prev, [gameId]: true }));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor="#FFA726"
        />
      }
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.welcome}>
          Welcome to Cobby
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Learn the world's funnest card games
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {games.map((game: CardGame) => (
          <Pressable key={game.id} onPress={() => handleGamePress(game)}>
            <Card style={styles.card}>
              {!loadedImages[game.id] && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#FFA726" />
                </View>
              )}
              <ImageBackground
                source={
                  typeof game.thumbnail_url === 'string' 
                    ? { uri: game.thumbnail_url }
                    : game.thumbnail_url
                }
                style={styles.cardBackground}
                imageStyle={styles.cardBackgroundImage}
                onLoad={() => handleImageLoad(game.id)}
              >
                <View style={styles.cardContent}>
                  <Text variant="headlineSmall" style={styles.cardTitle}>
                    {game.name}
                  </Text>
                  <Text variant="bodyMedium" style={styles.description}>
                    {game.description}
                  </Text>
                  <Button 
                    mode="contained" 
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    onPress={() => handleGamePress(game)}
                  >
                    Start Learning
                  </Button>
                </View>
              </ImageBackground>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  welcome: {
    color: '#FFFFFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  subtitle: {
    color: '#999999',
    marginBottom: 24,
  },
  cardContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 24,
    backgroundColor: '#1E1E1E',
    overflow: 'hidden',
    elevation: 8,
  },
  cardBackground: {
    height: 400,
  },
  cardBackgroundImage: {
    opacity: 0.7,
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    color: '#E0E0E0',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFA726',
    borderRadius: 4,
    width: 160,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    zIndex: 1,
  },
});

export default HomeScreen; 