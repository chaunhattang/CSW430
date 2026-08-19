import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCustomerScreen = ({ navigation }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!customerName.trim()) {
      Alert.alert('Error', 'Enter customer name!');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Enter phone number!');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/customers',
        {
          name: customerName.trim(),
          phone: phone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('Success', 'Added customer successfully!');
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot add customer!';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Add customer"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <Text style={styles.label}>
          Customer name <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          textColor="#000"
          placeholder="Input your customer's name"
          value={customerName}
          onChangeText={setCustomerName}
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Text style={styles.label}>
          Phone <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          textColor="#000"
          style={styles.input}
          placeholder="Input phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleAdd}
          disabled={loading}
          labelStyle={styles.buttonText}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 4,
    backgroundColor: '#E5536F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddCustomerScreen;
