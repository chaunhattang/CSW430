import React, { useState, useEffect } from 'react';
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

const TransactionDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(
          `https://kami-backend-5rs0.onrender.com/transactions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDetail(response.data);
      } catch (error) {
        Alert.alert('Error', 'Cannot load transaction detail');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centerLoading}>
        <ActivityIndicator size="large" color="#E5536F" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Transaction detail"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>General Information</Text>
          <Text style={styles.row}>
            Transaction code:{' '}
            <Text style={styles.bold}>{detail?.id || detail?._id}</Text>
          </Text>
          <Text style={styles.row}>
            Customer:{' '}
            <Text style={styles.bold}>
              {detail?.customer?.name} - {detail?.customer?.phone}
            </Text>
          </Text>
          <Text style={styles.row}>
            Creation time:{' '}
            <Text style={styles.bold}>{formatDate(detail?.createdAt)}</Text>
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Services list</Text>
          {detail?.services?.map((s, idx) => (
            <View key={idx} style={styles.serviceRow}>
              <Text style={{ flex: 1, fontSize: 14 }}>{s.name}</Text>
              <Text style={{ color: '#888', marginRight: 15 }}>
                x{s.quantity || 1}
              </Text>
              <Text style={{ fontWeight: 'bold' }}>{formatPrice(s.price)}</Text>
            </View>
          ))}
          <View
            style={[
              styles.serviceRow,
              { borderTopWidth: 1, borderColor: '#eee', paddingTop: 8 },
            ]}>
            <Text style={{ fontWeight: 'bold', flex: 1 }}>Total</Text>
            <Text style={{ fontWeight: 'bold' }}>
              {formatPrice(detail?.priceBeforePromotion || detail?.price)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cost</Text>
          <Text style={styles.row}>
            Amount of money:{' '}
            <Text style={styles.bold}>
              {formatPrice(detail?.priceBeforePromotion || detail?.price)}
            </Text>
          </Text>
          <Text style={styles.row}>
            Discount:{' '}
            <Text style={styles.bold}>
              -
              {formatPrice(
                (detail?.priceBeforePromotion || 0) - (detail?.price || 0)
              )}
            </Text>
          </Text>
          <Text style={[styles.row, { fontSize: 16, marginTop: 10 }]}>
            Total payment:{' '}
            <Text style={styles.totalPrice}>{formatPrice(detail?.price)}</Text>
          </Text>
        </View>
      </ScrollView>
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
  centerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#E5536F',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  row: {
    fontSize: 14,
    marginVertical: 4,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  totalPrice: {
    color: '#E5536F',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TransactionDetailScreen;
