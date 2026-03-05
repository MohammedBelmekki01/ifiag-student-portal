import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        router.replace('/login');
      } else {
        setChecking(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    router.replace('/login');
  };

  if (checking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Ifiag.logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>IFIAG</Text>
      <Text style={styles.subtitle}>Portail Etudiant</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bienvenue</Text>
        <Text style={styles.cardText}>
          Accedez a votre profil et gerez vos informations academiques depuis l'onglet Profil.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se deconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6600',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#003366',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  logoutButton: {
    backgroundColor: '#cc0000',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
