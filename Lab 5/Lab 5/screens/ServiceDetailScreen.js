import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;
  const [loading, setLoading] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleEdit = () => {
    navigation.navigate('Edit', { service });
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

              await axios.delete(
                `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              Alert.alert('Success', 'Delete service successfully!');
              navigation.goBack();

            } catch (error) {
              const errorMessage = error.response?.data?.message || 'Cannot delete service';
              Alert.alert('Error', errorMessage);
              console.error('Delete Error:', error);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!service) return null;

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Service Detail" color="white" titleStyle={styles.headerTitle} />

        <Menu>
          <MenuTrigger>
            <Appbar.Action icon="dots-vertical" color="white" />
          </MenuTrigger>
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption onSelect={handleEdit} text="Edit Service" />
            <MenuOption
              onSelect={handleDelete}
              text="Delete Service"
              customStyles={deleteOptionStyles}
            />
          </MenuOptions>
        </Menu>
      </Appbar.Header>

      <View style={styles.detailContainer}>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Service name: </Text>
          <Text style={styles.value}>{service.name}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Price: </Text>
          <Text style={styles.value}>{formatPrice(service.price)}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Creator ID: </Text>
          <Text style={styles.value}>{service.createdBy}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Time: </Text>
          <Text style={styles.value}>{formatDate(service.createdAt)}</Text>
        </Text>
        <Text style={styles.infoRow}>
          <Text style={styles.label}>Final update: </Text>
          <Text style={styles.value}>{formatDate(service.updatedAt)}</Text>
        </Text>
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

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginTop: 55,
    marginRight: 0,
    width: 150,
    elevation: 5,
  },
};

const deleteOptionStyles = {
  optionText: {
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  detailContainer: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  infoRow: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 12,
    color: '#333'
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16
  },
  value: {
    fontWeight: 'normal',
    color: '#555',
    fontSize: 16
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#E5536F',
    fontWeight: 'bold'
  },
});

export default ServiceDetailScreen;