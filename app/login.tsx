import React, { useState } from 'react';
import { View, Alert, Keyboard, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/services/api';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      const response = await api.post('auth/login', {
        email: data.email,
        password: data.password,
      });

      const { success, message, data: responseData } = response.data;
      const access_token = responseData?.access_token;

      if (!success || !access_token) {
        Alert.alert('Erreur', message || 'Echec de connexion');
        return;
      }

      await AsyncStorage.setItem('access_token', access_token);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.response?.data?.message || 'Echec de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IFIAG</Text>
      <Text style={styles.subtitle}>Connexion Etudiant</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email requis',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Format email invalide',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            style={[styles.input, formState.errors.email && styles.errorInput]}
            autoCapitalize="none"
            keyboardType="email-address"
            error={!!formState.errors.email}
            left={<TextInput.Icon icon="email" />}
            placeholder="exemple@domaine.com"
            placeholderTextColor="#aaa"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Mot de passe requis' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Mot de passe"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            style={[styles.input, formState.errors.password && styles.errorInput]}
            secureTextEntry={secureText}
            error={!!formState.errors.password}
            right={
              <TextInput.Icon
                icon={secureText ? 'eye-off' : 'eye'}
                onPress={() => setSecureText(!secureText)}
              />
            }
            placeholder="Mot de passe"
            placeholderTextColor="#aaa"
          />
        )}
      />

      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(handleLogin)}
        style={styles.button}
        contentStyle={{ paddingVertical: 8 }}
        labelStyle={{ fontSize: 18, fontWeight: '600' }}
      >
        Se connecter
      </Button>

      <Button
        mode="text"
        onPress={() => router.push('/register')}
        labelStyle={{ color: '#333', fontWeight: '600' }}
      >
        Pas de compte ? S{"'"}inscrire
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6600',
    alignSelf: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  errorInput: {
    borderColor: '#ff5252',
  },
  button: {
    marginVertical: 12,
    backgroundColor: '#FF6600',
    borderRadius: 8,
  },
});
