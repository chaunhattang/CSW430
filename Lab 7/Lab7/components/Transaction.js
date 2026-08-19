import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const Transaction = ({ transaction, hideCustomer, onPress }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${mins}`;
  };

  const isCancelled = transaction?.status === 'cancelled';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.headerCode} numberOfLines={1}>
          {transaction?.id || transaction?._id} -{' '}
          {formatDate(transaction?.createdAt)}
          {isCancelled && <Text style={styles.cancelled}> - Cancelled</Text>}
        </Text>

        {transaction?.services?.map((item, index) => (
          <Text key={index} style={styles.serviceItem} numberOfLines={1}>
            - {item.name}
          </Text>
        ))}
        {!hideCustomer ? (
          <Text style={styles.customerName}>
            Customer: {transaction?.customer?.name || 'N/A'}
          </Text>
        ) : (
          <></>
        )}
      </View>

      <Text style={styles.price}>{formatPrice(transaction?.price)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,

    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  headerCode: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cancelled: {
    color: 'red',
    fontWeight: 'bold',
  },
  serviceItem: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  customerName: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#E5536F',
  },
});

export default Transaction;
