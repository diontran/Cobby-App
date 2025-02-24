import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, FAB, Card, Button, ActivityIndicator } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { uploadImage, getUploadedImages } from '../../services/images';
import type { UploadedImage } from '../../types/library';

export default function Library() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const loadImages = async () => {
    try {
      const data = await getUploadedImages();
      setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUploading(true);
        const uploadedImage = await uploadImage(result.assets[0].uri);
        setImages([uploadedImage, ...images]);
      }
    } catch (error) {
      console.error('Error picking/uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text variant="headlineSmall" style={styles.title}>
          My Card Collection
        </Text>

        {uploading && (
          <Card style={styles.uploadingCard}>
            <Card.Content style={styles.uploadingContent}>
              <ActivityIndicator color="#FFA726" size="small" />
              <Text variant="bodyMedium" style={styles.uploadingText}>
                Analyzing your card...
              </Text>
            </Card.Content>
          </Card>
        )}

        {images.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                Start Your Collection
              </Text>
              <Text variant="bodyMedium" style={styles.emptyText}>
                Scan your first card to begin building your collection
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={handleImagePick}
                style={styles.button}
                labelStyle={styles.buttonLabel}
              >
                Import Card
              </Button>
            </Card.Actions>
          </Card>
        ) : (
          <View style={styles.imageGrid}>
            {images.map((image: UploadedImage) => (
              <Card key={image.id} style={styles.imageCard}>
                <Card.Cover source={{ uri: image.image_url }} />
                <Card.Content>
                  <Text variant="bodySmall" style={styles.status}>
                    Status: {image.status}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="camera"
        style={styles.fab}
        onPress={handleImagePick}
        label="Scan Card"
        loading={uploading}
        color="#FFFFFF"
      />
    </View>
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
  title: {
    color: '#FFFFFF',
    padding: 24,
    paddingTop: 40,
  },
  uploadingCard: {
    margin: 16,
    backgroundColor: '#1E1E1E',
  },
  uploadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  uploadingText: {
    marginLeft: 8,
    color: '#FFFFFF',
  },
  emptyCard: {
    margin: 16,
    backgroundColor: '#1E1E1E',
  },
  emptyTitle: {
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyText: {
    color: '#999999',
  },
  imageGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  imageCard: {
    width: '47%',
    backgroundColor: '#1E1E1E',
  },
  status: {
    marginTop: 8,
    color: '#999999',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#FFA726',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFA726',
  },
}); 