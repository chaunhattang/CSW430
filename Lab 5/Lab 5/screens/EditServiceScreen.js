import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditServiceScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const [serviceName, setServiceName] = useState(service?.name || '');
  const [price, setPrice] = useState(service?.price?.toString() || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
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

      const response = await axios.put(
        `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
        {
          name: serviceName.trim(),
          price: Number(price),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Success', 'Edit service successfully!');
      navigation.navigate('Home')

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Cannot edit service!';
      Alert.alert('Error', errorMessage);
      console.error('Update Service Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Edit Service"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <Text style={styles.label}>
          Service Name <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service name"
          placeholderTextColor="#999"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <Text style={styles.label}>
          Price <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleUpdate}
          disabled={loading}
          labelStyle={styles.buttonText}>
          {loading ? 'Editing...' : 'Edit'}
        </Button>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E5536F" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F2F2F7',
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#E5536F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#E5536F',
    fontWeight: 'bold',
  },
});

export default EditServiceScreen;