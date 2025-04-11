import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../utils/supabase';

export default function SettingsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [automaticUpdates, setAutomaticUpdates] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Exemple de récupération de données utilisateur depuis Supabase
    const fetchProfile = async () => {
      setLoading(true);
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (error) {
          console.error('Erreur lors du chargement du profil:', error);
        } else {
          setProfileData(data);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const toggleAutomaticUpdates = () => {
    setAutomaticUpdates(!automaticUpdates);
    // Vous pouvez enregistrer cette préférence dans Supabase si besoin.
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4ECDC4" style={styles.loading} />
      ) : (
        <View style={styles.content}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>Mises à jour automatiques</Text>
            <Switch
              value={automaticUpdates}
              onValueChange={toggleAutomaticUpdates}
            />
          </View>
          {profileData && (
            <View style={styles.profileSection}>
              <Text style={styles.sectionTitle}>Profil</Text>
              <Text style={styles.profileText}>Email: {profileData.email}</Text>
              <Text style={styles.profileText}>Nom: {profileData.name}</Text>
              {/* Ajoutez d'autres informations de profil ici */}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  loading: {
    marginTop: 50,
  },
  content: { padding: 20 },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  preferenceLabel: {
    fontSize: 18,
    color: '#2C3E50',
  },
  profileSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 5,
  },
});