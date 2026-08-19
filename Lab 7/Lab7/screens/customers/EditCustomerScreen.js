import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditCustomerScreen = ({ route, navigation }) => {
  const { customer } = route.params;

  const [name, setName] = useState(customer?.name || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name.trim()) {
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

      const response = await axios.put(
        `https://kami-backend-5rs0.onrender.com/customers/${customer._id}`,
        {
          name: name.trim(),
          phone: phone.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Success', 'Updated customer successfully!');
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Cannot edit customer!';
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
          title="Edit Customer"
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
          value={name}
          onChangeText={setName}
          textColor="#000"
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Text style={styles.label}>
          Phone <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={phone}
          textColor="#000"
          onChangeText={setPhone}
          mode="outlined"
          activeOutlineColor="#E5536F"
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleUpdate}
          disabled={loading}
          labelStyle={styles.buttonText}>
          {loading ? 'Updating...' : 'Update'}
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

export default EditCustomerScreen;