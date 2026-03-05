import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '@/services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('Male');
  const [studentClass, setStudentClass] = useState('');
  const [field, setField] = useState('');
  const [enrollmentDate, setEnrollmentDate] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        birth_date: birthDate,
        gender,
        class: studentClass,
        field,
        enrollment_date: enrollmentDate,
      });
      Alert.alert('Inscription reussie', 'Vous pouvez maintenant vous connecter.', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Ifiag.logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>IFIAG</Text>
      </View>

      <Text style={styles.formTitle}>Formulaire d{"'"}inscription</Text>

      <Text style={styles.label}>Prenom</Text>
      <TextInput
        placeholder="Prenom"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Date de naissance (YYYY-MM-DD)</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput
        placeholder="Male / Female"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />

      <Text style={styles.label}>Classe</Text>
      <TextInput
        placeholder="Classe"
        value={studentClass}
        onChangeText={setStudentClass}
        style={styles.input}
      />

      <Text style={styles.label}>Filiere</Text>
      <TextInput
        placeholder="Filiere"
        value={field}
        onChangeText={setField}
        style={styles.input}
      />

      <Text style={styles.label}>Date d{"'"}inscription (YYYY-MM-DD)</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={enrollmentDate}
        onChangeText={setEnrollmentDate}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S{"'"}inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
        <Text style={styles.backLinkText}>Deja inscrit ? Se connecter</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f8fa',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6600',
    paddingLeft: 10,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6600',
    paddingBottom: 25,
    textAlign: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF6600',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  backLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 15,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    color: '#cc0000',
    textAlign: 'center',
  },
});
