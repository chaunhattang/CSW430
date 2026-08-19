import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const Customer = ({ name, phone, price, loyalty, onPress }) => {
  const formatPrice = (val) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val || 0);
  };

  const isMember = loyalty?.toLowerCase() === 'member';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.key} numberOfLines={1}>
          Customer: <Text style={styles.value}>{name}</Text>
        </Text>
        <Text style={styles.key} numberOfLines={1}>
          Phone: <Text style={styles.value}>{phone}</Text>
        </Text>
        <Text style={styles.key} numberOfLines={1}>
          Total money: <Text style={styles.price}>{formatPrice(price)}</Text>
        </Text>
      </View>
      <View style={styles.rightBadge}>
        <IconButton
          icon="crown"
          size={24}
          iconColor={isMember ? '#E5536F' : '#999'}
          style={{ margin: 0 }}
        />
        <Text
          style={[
            styles.loyaltyText,
            { color: isMember ? '#E5536F' : '#999' },
          ]}>
          {isMember ? 'Member' : 'Guest'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 15,
    marginVertical: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  key: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontWeight: 'bold',
    color: '#E5536F',
  },
  rightBadge: {
    alignItems: 'center',
    justify: 'center',
  },
  loyaltyText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Customer;
