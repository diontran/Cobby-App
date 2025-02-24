import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, ProgressBar } from 'react-native-paper';

export default function Progress() {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        My Progress
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Overall Progress
          </Text>
          <ProgressBar 
            progress={0.7} 
            color="#FFA726" 
            style={styles.progressBar} 
          />
          <Text variant="bodyMedium" style={styles.progressText}>
            70% Complete
          </Text>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Recent Activity
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleSmall" style={styles.activityTitle}>
            Pokemon TCG
          </Text>
          <Text variant="bodyMedium" style={styles.activityDesc}>
            Completed Basic Rules Module
          </Text>
          <ProgressBar 
            progress={0.4} 
            color="#FFB74D" 
            style={styles.progressBar} 
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleSmall" style={styles.activityTitle}>
            Yu-Gi-Oh!
          </Text>
          <Text variant="bodyMedium" style={styles.activityDesc}>
            Started Advanced Strategies
          </Text>
          <ProgressBar 
            progress={0.2} 
            color="#FFD54F" 
            style={styles.progressBar} 
          />
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Achievements
      </Text>

      <View style={styles.achievementsGrid}>
        {[1, 2, 3].map((achievement) => (
          <Card key={achievement} style={styles.achievementCard}>
            <Card.Content>
              <Text variant="titleSmall" style={styles.achievementTitle}>
                Achievement {achievement}
              </Text>
              <Text variant="bodySmall" style={styles.achievementDesc}>
                Unlocked new milestone
              </Text>
            </Card.Content>
          </Card>
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
  title: {
    color: '#FFFFFF',
    padding: 24,
    paddingTop: 40,
  },
  card: {
    margin: 16,
    marginTop: 8,
    backgroundColor: '#1E1E1E',
  },
  cardTitle: {
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2A2A2A',
  },
  progressText: {
    color: '#B0B0B0',
    marginTop: 8,
  },
  sectionTitle: {
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  activityTitle: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  activityDesc: {
    color: '#B0B0B0',
    marginBottom: 16,
  },
  achievementsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: '#1E1E1E',
  },
  achievementTitle: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    color: '#B0B0B0',
  },
}); 