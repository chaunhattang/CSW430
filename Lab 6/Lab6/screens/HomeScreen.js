import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { IconButton, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
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
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setServices(response.data || []);
    } catch (error) {
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

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E5536F' }}
      edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Appbar.Header style={styles.header} statusBarHeight={0}>
          <Appbar.Content
            title="Huyền Trinh"
            color="white"
            titleStyle={styles.title}
          />
          <Appbar.Action
            icon="account-circle"
            color="white"
            size={28}
            onPress={() => navigation.navigate('Setting')}
          />
        </Appbar.Header>

        <View style={styles.listHeader}>
          <Text style={styles.items}>Danh sách dịch vụ</Text>
          <IconButton
            icon="plus"
            size={20}
            iconColor="#FFFFFF"
            style={{ backgroundColor: '#E5536F', margin: 0 }}
            onPress={() => navigation.navigate('AddService')}
          />
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
            contentContainerStyle={{ paddingBottom: 20 }}>
            {services.map((item) => (
              <Service
                key={item._id || item.id}
                name={item.name}
                price={item.price}
                onPress={() =>
                  navigation.navigate('ServiceDetail', { service: item })
                }
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  items: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
