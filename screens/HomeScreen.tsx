import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StoryCard {
  id: string;
  title: string;
  progress: number;
  imageUrl: string;
  universe: string;
}

const mockStories: StoryCard[] = [
  {
    id: '1',    title: "L'Aventure Spatiale",
    progress: 60,
    imageUrl: 'https://api.a0.dev/assets/image?text=cute%20space%20adventure%20for%20kids%20illustration&aspect=16:9',
    universe: 'espace'
  },
  {
    id: '2',
    title: 'La Jungle Mystérieuse',
    progress: 30,
    imageUrl: 'https://api.a0.dev/assets/image?text=magical%20jungle%20adventure%20for%20kids%20illustration&aspect=16:9',
    universe: 'jungle'
  }
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* En-tête avec Avatar et Bienvenue */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=cute%20kid%20avatar%20illustration&aspect=1:1' }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bonjour Lucas !</Text>
            <Text style={styles.subtitle}>Prêt pour de nouvelles aventures ?</Text>
          </View>
        </View>

        {/* Assistant AI */}
        <View style={styles.aiAssistantContainer}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=friendly%20robot%20teacher%20character%20for%20kids&aspect=1:1' }}
            style={styles.aiAssistantImage}
          />
          <View style={styles.aiMessageBubble}>
            <Text style={styles.aiMessage}>Que veux-tu explorer aujourd'hui ?</Text>
          </View>
        </View>

        {/* Bouton Créer une Histoire */}        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateStory')}>
          <MaterialCommunityIcons name="plus-circle" size={24} color="white" />
          <Text style={styles.createButtonText}>Créer une nouvelle histoire</Text>
        </TouchableOpacity>

        {/* Histoires en cours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tes histoires en cours</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockStories.map((story) => (
              <TouchableOpacity key={story.id} style={styles.storyCard}>
                <Image source={{ uri: story.imageUrl }} style={styles.storyImage} />
                <View style={styles.storyInfo}>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${story.progress}%` }]} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu rapide */}
        <View style={styles.quickMenu}>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="book-open-variant" size={32} color="#FF6B6B" />
            <Text style={styles.menuText}>Bibliothèque</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="star" size={32} color="#4ECDC4" />
            <Text style={styles.menuText}>Récompenses</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialCommunityIcons name="school" size={32} color="#FFD93D" />
            <Text style={styles.menuText}>Défis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  profileButton: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFD93D',
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitle: {
    fontSize: 16,
    color: '#95A5A6',
  },
  aiAssistantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E8F6FF',
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  aiAssistantImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  aiMessageBubble: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginLeft: 10,
  },
  aiMessage: {
    fontSize: 16,
    color: '#2C3E50',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  storyCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  storyImage: {
    width: '100%',
    height: 160,
  },
  storyInfo: {
    padding: 15,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  quickMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 5,
    fontSize: 14,
    color: '#2C3E50',
  },
});