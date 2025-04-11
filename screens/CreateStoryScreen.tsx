import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const universes = [
  {
    id: 'space',
    name: 'Espace',
    icon: 'rocket',
    color: '#6C5CE7',
    image: 'https://api.a0.dev/assets/image?text=space%20universe%20for%20kids%20adventure&aspect=16:9'
  },
  {
    id: 'jungle',
    name: 'Jungle',
    icon: 'tree',
    color: '#00B894',
    image: 'https://api.a0.dev/assets/image?text=jungle%20universe%20for%20kids%20adventure&aspect=16:9'
  },
  {
    id: 'ocean',
    name: 'Océan',
    icon: 'fish',
    color: '#0984E3',
    image: 'https://api.a0.dev/assets/image?text=ocean%20universe%20for%20kids%20adventure&aspect=16:9'
  },
  {
    id: 'castle',
    name: 'Château',
    icon: 'castle',
    color: '#E17055',
    image: 'https://api.a0.dev/assets/image?text=castle%20universe%20for%20kids%20adventure&aspect=16:9'
  }
];

const characters = [
  {
    id: 'astronaut',
    name: 'Astro',
    image: 'https://api.a0.dev/assets/image?text=cute%20astronaut%20character%20for%20kids&aspect=1:1'
  },
  {
    id: 'explorer',
    name: 'Indiana',
    image: 'https://api.a0.dev/assets/image?text=cute%20explorer%20character%20for%20kids&aspect=1:1'
  },
  {
    id: 'mermaid',
    name: 'Marina',
    image: 'https://api.a0.dev/assets/image?text=cute%20mermaid%20character%20for%20kids&aspect=1:1'
  }
];

export default function CreateStoryScreen({ navigation }) {
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crée ton histoire</Text>
        </View>

        {/* Universe Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisis ton univers</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.universesContainer}>
            {universes.map((universe) => (
              <TouchableOpacity
                key={universe.id}
                style={[
                  styles.universeCard,
                  selectedUniverse === universe.id && styles.selectedCard
                ]}
                onPress={() => setSelectedUniverse(universe.id)}>
                <Image source={{ uri: universe.image }} style={styles.universeImage} />
                <View style={[styles.universeInfo, { backgroundColor: universe.color }]}>
                  <MaterialCommunityIcons name={universe.icon} size={24} color="white" />
                  <Text style={styles.universeName}>{universe.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Character Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisis ton héros</Text>
          <View style={styles.charactersGrid}>
            {characters.map((character) => (
              <TouchableOpacity
                key={character.id}
                style={[
                  styles.characterCard,
                  selectedCharacter === character.id && styles.selectedCard
                ]}
                onPress={() => setSelectedCharacter(character.id)}>
                <Image source={{ uri: character.image }} style={styles.characterImage} />
                <Text style={styles.characterName}>{character.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>        {/* Start Button */}
        <TouchableOpacity 
          style={[
            styles.startButton,
            (!selectedUniverse || !selectedCharacter) && styles.startButtonDisabled
          ]}
          disabled={!selectedUniverse || !selectedCharacter}
          onPress={() => navigation.navigate('InteractiveStory', { 
            universe: selectedUniverse, 
            character: selectedCharacter, 
            age: 7 // âge par défaut, à revoir si besoin
          })}>
          <Text style={styles.startButtonText}>Commencer l'aventure</Text>
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
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
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
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
  universesContainer: {
    paddingRight: 20,
  },
  universeCard: {
    width: 200,
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#4ECDC4',
  },
  universeImage: {
    width: '100%',
    height: 120,
  },
  universeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  universeName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  charactersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  characterCard: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  characterName: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 15,
    margin: 20,
  },
  startButtonDisabled: {
    backgroundColor: '#95A5A6',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});