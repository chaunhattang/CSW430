import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Customer from '../components/Customer';

 const CustomerScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setCustomers(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'Cannot load customers');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [])
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E5536F' }}
      edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.header}>
          <Text style={styles.title}>Customer</Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#E5536F"
            style={{ marginTop: 20 }}
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}>
            {customers.map((item) => (
              <Customer
                key={item._id || item.id}
                name={item.name}
                phone={item.phone}
                price={item.totalSpent}
                loyalty={item.loyalty}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        )}

        <IconButton
          icon="plus"
          size={24}
          iconColor="#FFFFFF"
          style={styles.fabIcon}
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  fabIcon: {
    backgroundColor: '#E5536F',
    borderRadius: 28,
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    elevation: 4,
  },
});

export default CustomerScreen;
