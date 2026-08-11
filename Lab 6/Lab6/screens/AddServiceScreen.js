import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddServiceScreen = ({ navigation }) => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!serviceName.trim()) {
      Alert.alert('Error', 'Enter service name!');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      Alert.alert('Error', 'Error with price!');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');

      await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          name: serviceName.trim(),
          price: Number(price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Success', 'Added service successfully!');
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot add service!';
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
          title="Add Service"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <Text style={styles.label}>
          Service name <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a service name"
          value={serviceName}
          textColor="#000"
          onChangeText={setServiceName}
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Text style={styles.label}>
          Price <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          keyboardType="numeric"
          value={price}
          textColor="#000"
          onChangeText={setPrice}
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

export default AddServiceScreen;
