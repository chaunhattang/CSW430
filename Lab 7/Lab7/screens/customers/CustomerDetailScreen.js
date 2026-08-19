import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Transaction from '../../components/Transaction';

const CustomerDetailScreen = ({ route, navigation }) => {
  const { customer } = route.params;
  const [customerInfo, setCustomerInfo] = useState(customer);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleDelete = () => {
    Alert.alert(
      'Warning',
      'Are you sure that you want to remove this client? This will not be possible to return',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const token = await AsyncStorage.getItem('userToken');

              const response = await axios.delete(
                `https://kami-backend-5rs0.onrender.com/customers/${customer._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              Alert.alert('Success', 'Delete customer successfully!');
              navigation.goBack();
            } catch (error) {
              const errorMessage =
                error.response?.data?.message || 'Cannot delete customer';
              Alert.alert('Error', errorMessage);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(
        `https://kami-backend-5rs0.onrender.com/customers/${customer._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data) {
        setCustomerInfo(response.data);
        setTransactions(response.data.transactions || []);
      }
    } catch (error) {
      Alert.alert('Error', 'Cannot load customer details');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCustomerDetails();
    }, [customer._id])
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Customer detail"
          color="white"
          titleStyle={styles.headerTitle}
        />

        <Appbar.Action
          icon="pencil"
          color="white"
          onPress={() =>
            navigation.navigate('EditCustomer', { customer: customerInfo })
          }
        />
        <Appbar.Action icon="delete" color="white" onPress={handleDelete} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>General Information</Text>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Name: </Text>
            <Text style={styles.boldRight}>{customerInfo.name}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Phone: </Text>
            <Text style={styles.boldRight}>{customerInfo.phone}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Total spent: </Text>
            <Text style={styles.boldRight}>
              {formatPrice(customerInfo.totalSpent)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Time: </Text>
            <Text style={styles.boldRight}>
              {formatDate(customerInfo.createdAt)}
            </Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Last update: </Text>
            <Text style={styles.boldRight}>
              {formatDate(customerInfo.updatedAt)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
            Transaction history
          </Text>
          {transactions.map((item) => (
            <Transaction
              key={item._id || item.id}
              transaction={item}
              hideCustomer={true}
              onPress={() =>
                navigation.navigate('TransactionDetail', {
                  transaction: item,
                })
              }
            />
          ))}
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#E5536F" />
        </View>
      )}
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
  container: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#E5536F',
    fontSize: 16,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justify: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  boldRight: {
    color: '#333',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justify: 'center',
    alignItems: 'center',
  },
});

export default CustomerDetailScreen;
