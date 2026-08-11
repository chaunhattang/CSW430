import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('0373007856');
  const [password, setPassword] = useState('123');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Enter phone and password!');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/auth',
        { phone, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data?.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        Alert.alert('Success', 'Login Successfully');
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Error', 'Wrong password or no token returned!');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot access server!';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        label="Phone"
        mode="outlined"
        value={phone}
        textColor="#000"
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        secureTextEntry={secureText}
        value={password}
        textColor="#000"
        onChangeText={setPassword}
        right={
          <TextInput.Icon
            key="eye-icon"
            icon={secureText ? 'eye' : 'eye-off'}
            onPress={() => setSecureText(!secureText)}
          />
        }
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleLogin}
        disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    color: '#E5536F',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    color: 'black',
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#E5536F',
  },
});

export default LoginScreen;
