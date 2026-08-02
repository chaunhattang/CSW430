import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Service from '../components/Service';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
        headers: {
          token: token,
          'Content-Type': 'application/json'
        }
      });
      setServices(response.data || []);
    } catch (error) {
      console.error('Error service list:', error);
      Alert.alert('Error', 'Cannot load services');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchServices();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  return (<>
    <View style={styles.header}>
      <Text style={styles.title}>Huyền Trinh</Text>
      <IconButton icon="account-circle" size={30} color="white" onPress={handleLogout} />
    </View>

    <View style={styles.listHeader}>
      <Text style={styles.items}>Danh sách dịch vụ</Text>
      <IconButton
        icon="plus" size={20} color="#FFFFFF"
        style={{ backgroundColor: '#E5536F', borderRadius: 20 }}
        onPress={() => navigation.navigate('Add')}
      />
    </View>

    {
      loading ? (
        <ActivityIndicator size="large" color="#E5536F" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {services.map((item) => (
            <Service
              key={item._id || item.id}
              id={item._id || item.id}
              name={item.name}
              price={item.price}
              onPress={() => navigation.navigate('Detail', { service: item })}
            />
          ))}
        </ScrollView>
      )
    }
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#E5536F',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  items: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
});