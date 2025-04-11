import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mockChildProgress = {
  reading: 75,
  math: 60,
  vocabulary: 85,
  totalStories: 12,
  totalTime: '14h 30m',
  lastActivity: '2024-03-26'
};

const mockAchievements = [
  { id: '1', title: 'Premier Conte', icon: 'book-open-variant', color: '#FF6B6B' },
  { id: '2', title: 'Math Expert', icon: 'calculator', color: '#4ECDC4' },
  { id: '3', title: 'Vocabulaire +', icon: 'dictionary', color: '#FFD93D' },
];

export default function ParentDashboardScreen({ navigation }) {
  const [timeLimit, setTimeLimit] = useState(60); // minutes

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tableau de Bord Parent</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
  <MaterialCommunityIcons name="cog" size={24} color="#2C3E50" />
</TouchableOpacity>
        </View>

        {/* Child Overview */}
        <View style={styles.childOverview}>
          <Image 
            source={{ uri: 'https://api.a0.dev/assets/image?text=cute%20kid%20avatar%20illustration&aspect=1:1' }}
            style={styles.childAvatar}
          />
          <View style={styles.childInfo}>
            <Text style={styles.childName}>Lucas</Text>
            <Text style={styles.childAge}>7 ans</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progrès d'Apprentissage</Text>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <MaterialCommunityIcons name="book" size={24} color="#FF6B6B" />
              <Text style={styles.progressLabel}>Lecture</Text>
              <Text style={styles.progressValue}>{mockChildProgress.reading}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${mockChildProgress.reading}%`, backgroundColor: '#FF6B6B' }]} />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <MaterialCommunityIcons name="math-compass" size={24} color="#4ECDC4" />
              <Text style={styles.progressLabel}>Mathématiques</Text>
              <Text style={styles.progressValue}>{mockChildProgress.math}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${mockChildProgress.math}%`, backgroundColor: '#4ECDC4' }]} />
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <MaterialCommunityIcons name="alphabetical" size={24} color="#FFD93D" />
              <Text style={styles.progressLabel}>Vocabulaire</Text>
              <Text style={styles.progressValue}>{mockChildProgress.vocabulary}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${mockChildProgress.vocabulary}%`, backgroundColor: '#FFD93D' }]} />
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="book-multiple" size={32} color="#4ECDC4" />
            <Text style={styles.statValue}>{mockChildProgress.totalStories}</Text>
            <Text style={styles.statLabel}>Histoires Lues</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="clock-outline" size={32} color="#FF6B6B" />
            <Text style={styles.statValue}>{mockChildProgress.totalTime}</Text>
            <Text style={styles.statLabel}>Temps Total</Text>
          </View>
        </View>

        {/* Time Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contrôle du Temps</Text>
          <View style={styles.timeControl}>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setTimeLimit(Math.max(0, timeLimit - 15))}>
              <MaterialCommunityIcons name="minus" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.timeDisplay}>
              <Text style={styles.timeValue}>{timeLimit}</Text>
              <Text style={styles.timeUnit}>minutes</Text>
            </View>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setTimeLimit(timeLimit + 15)}>
              <MaterialCommunityIcons name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dernières Récompenses</Text>
          <View style={styles.achievementsContainer}>
            {mockAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <MaterialCommunityIcons 
                  name={achievement.icon} 
                  size={32} 
                  color={achievement.color} 
                />
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
              </View>
            ))}
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  settingsButton: {
    padding: 8,
  },
  childOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  childAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  childAge: {
    fontSize: 16,
    color: '#95A5A6',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  progressItem: {
    marginBottom: 15,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 10,
  },
  progressValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#95A5A6',
  },
  timeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeButton: {
    backgroundColor: '#4ECDC4',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeDisplay: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  timeUnit: {
    fontSize: 14,
    color: '#95A5A6',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementTitle: {
    fontSize: 12,
    color: '#2C3E50',
    textAlign: 'center',
    marginTop: 5,
  },
});