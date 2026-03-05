import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('auth/profile');
        const { user, student } = response.data.data;
        setUser({ ...user, ...student });
      } catch (err: any) {
        if (err.response?.status === 401) {
          await AsyncStorage.removeItem('access_token');
          router.replace('/login');
          return;
        }
        setError('Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6600" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {user.first_name} {user.last_name}
        </Text>

        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Date de naissance" value={user.birth_date} />
        <InfoRow label="Genre" value={user.gender} />
        <InfoRow label="Classe" value={user.class} />
        <InfoRow label="Filiere" value={user.field} />
        <InfoRow
          label="Date d'inscription"
          value={new Date(user.created_at).toLocaleDateString()}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se deconnecter</Text>
      </TouchableOpacity>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.separator} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#1c1c1c',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
    textAlign: 'center',
    color: '#003366',
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontWeight: '400',
    fontSize: 16,
    color: '#222',
    maxWidth: '65%',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#e1e4e8',
    marginVertical: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#cc0000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#cc0000',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
