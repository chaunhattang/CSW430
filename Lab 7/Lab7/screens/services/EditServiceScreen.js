import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
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
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Success', 'Edit service successfully!');
      navigation.navigate('MainTabs');
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot edit service!';
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
          value={serviceName}
          onChangeText={setServiceName}
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Text style={styles.label}>
          Price <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          mode="outlined"
          activeOutlineColor="#E5536F"
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

export default EditServiceScreen;
