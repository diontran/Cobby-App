import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Button, Card, ActivityIndicator, List } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../../contexts/AuthContext';
import { getGameDetails } from '../../../services/games';
import type { CardGame } from '../../../types/game';

export default function GameDetails() {
  const { id } = useLocalSearchParams();
  const [game, setGame] = React.useState<CardGame | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadGameDetails();
  }, [id]);

  const loadGameDetails = async () => {
    try {
      const gameData = await getGameDetails(id as string);
      setGame(gameData);
    } catch (error) {
      console.error('Error loading game details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !game) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFA726" />
      </View>
    );
  }

  const getGameSummary = (gameName: string) => {
    switch (gameName) {
      case 'Pokemon TCG':
        return {
          objective: "Battle with Pokemon cards to defeat your opponent's Pokemon and claim prize cards.",
          basics: [
            "Build a 60-card deck with Pokemon, Energy, and Trainer cards",
            "Set up 6 prize cards and draw 7 cards to start",
            "Evolve Pokemon and attach energy cards to power up attacks",
            "Win by collecting all prize cards or if opponent can't draw a card"
          ],
          keyTerms: [
            "Basic Pokemon - Starting Pokemon that don't evolve from anything",
            "Evolution - Powering up a Pokemon to its next stage",
            "Energy Cards - Resources needed for Pokemon attacks",
            "Trainer Cards - Special cards that provide various effects"
          ]
        };
      case 'Yu-Gi-Oh!':
        return {
          objective: "Reduce your opponent's Life Points to zero using Monster, Spell, and Trap cards.",
          basics: [
            "Build a deck of 40-60 cards",
            "Start with 8000 Life Points",
            "Summon monsters and set spells/traps each turn",
            "Attack opponent's monsters or Life Points directly"
          ],
          keyTerms: [
            "Normal Summon - Basic monster summon once per turn",
            "Special Summon - Additional monster summon through card effects",
            "Spell Cards - Magic cards with various effects",
            "Trap Cards - Surprise cards that can counter opponent's moves"
          ]
        };
      // Add other games...
      default:
        return null;
    }
  };

  const gameSummary = getGameSummary(game.name);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={
          typeof game.thumbnail_url === 'string'
            ? { uri: game.thumbnail_url }
            : game.thumbnail_url
        }
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.overlay}>
          <Text variant="headlineLarge" style={styles.title}>
            {game.name}
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            {game.description}
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        {gameSummary && (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.sectionTitle}>
                Game Overview
              </Text>
              <Text variant="bodyMedium" style={[styles.sectionText, styles.objective]}>
                {gameSummary.objective}
              </Text>

              <Text variant="titleMedium" style={styles.subsectionTitle}>
                Basic Rules
              </Text>
              {gameSummary.basics.map((rule, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {rule}
                </Text>
              ))}

              <Text variant="titleMedium" style={[styles.subsectionTitle, styles.topSpacing]}>
                Key Terms
              </Text>
              {gameSummary.keyTerms.map((term, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {term}
                </Text>
              ))}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Start Learning
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {/* Navigate to first lesson */}}
            >
              Begin Tutorial
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Card Recognition
            </Text>
            <Text variant="bodyMedium" style={styles.sectionText}>
              Practice identifying cards and their effects.
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {/* Navigate to card scanner */}}
            >
              Scan Cards
            </Button>
          </Card.Content>
        </Card>
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
    height: 300,
  },
  headerImage: {
    opacity: 0.7,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 24,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: '#E0E0E0',
    marginBottom: 16,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionText: {
    color: '#B0B0B0',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFA726',
  },
  objective: {
    fontWeight: '500',
    marginBottom: 16,
  },
  subsectionTitle: {
    color: '#FFFFFF',
    marginBottom: 8,
    marginTop: 16,
  },
  topSpacing: {
    marginTop: 24,
  },
  bulletPoint: {
    color: '#B0B0B0',
    marginBottom: 8,
    marginLeft: 8,
  },
}); 