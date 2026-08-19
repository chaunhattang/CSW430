import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;
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
      'Are you sure that you want to remove this service? This operation cannot be returned',
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
                `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              Alert.alert('Success', 'Delete service successfully!');
              navigation.goBack();
            } catch (error) {
              const errorMessage =
                error.response?.data?.message || 'Cannot delete service';
              Alert.alert('Error', errorMessage);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Service Detail"
          color="white"
          titleStyle={styles.headerTitle}
        />

        <Appbar.Action
          icon="pencil"
          color="white"
          onPress={() => navigation.navigate('EditService', { service })}
        />
        <Appbar.Action icon="delete" color="white" onPress={handleDelete} />
      </Appbar.Header>

      <View style={styles.detailContainer}>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Service name: </Text>
          {service.name}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Price: </Text>
          {formatPrice(service.price)}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Creator ID: </Text>
          {service.createdBy}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Time: </Text>
          {formatDate(service.createdAt)}
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Final update: </Text>
          {formatDate(service.updatedAt)}
        </Text>
      </View>

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
  detailContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  infoRow: {
    fontSize: 15,
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  loadingOverlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServiceDetailScreen;
