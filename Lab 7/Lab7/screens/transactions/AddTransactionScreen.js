import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddTransactionScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets(); 

  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [executors, setExecutors] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const headers = { Authorization: `Bearer ${token}` };

      const resCustomers = await axios.get('https://kami-backend-5rs0.onrender.com/customers', { headers });
      setCustomers(
        resCustomers.data.map((item) => ({
          label: `${item.name} - ${item.phone}`,
          value: item._id,
        }))
      );

      const resServices = await axios.get('https://kami-backend-5rs0.onrender.com/services', { headers });
      setServices(resServices.data);

      const resUsers = await axios.get('https://kami-backend-5rs0.onrender.com/users', { headers });
      setExecutors(
        resUsers.data.map((item) => ({
          label: item.name || item.username || 'Staff',
          value: item._id,
        }))
      );
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải dữ liệu từ máy chủ!');
    } finally {
      setLoading(false);
    }
  };

  const toggleService = (serviceId) => {
    const updated = { ...selectedServices };
    if (updated[serviceId]) {
      delete updated[serviceId];
    } else {
      updated[serviceId] = { quantity: 1, userId: null };
    }
    setSelectedServices(updated);
  };

  const changeQuantity = (serviceId, amount) => {
    if (!selectedServices[serviceId]) return;
    const currentQty = selectedServices[serviceId].quantity;
    const newQty = currentQty + amount;

    const updated = { ...selectedServices };
    if (newQty <= 0) {
      delete updated[serviceId];
    } else {
      updated[serviceId].quantity = newQty;
    }
    setSelectedServices(updated);
  };

  const changeExecutor = (serviceId, userId) => {
    if (!selectedServices[serviceId]) return;
    const updated = { ...selectedServices };
    updated[serviceId].userId = userId;
    setSelectedServices(updated);
  };

  const calculateTotal = () => {
    let total = 0;
    for (const serviceId in selectedServices) {
      const foundService = services.find((item) => item._id === serviceId);
      if (foundService) {
        total += foundService.price * selectedServices[serviceId].quantity;
      }
    }
    return total;
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount || 0) + ' đ';
  };

  const handleAddTransaction = async () => {
    if (!selectedCustomer) {
      Alert.alert('Thông báo', 'Vui lòng chọn khách hàng!');
      return;
    }

    const selectedIds = Object.keys(selectedServices);
    if (selectedIds.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một dịch vụ!');
      return;
    }

    const servicesPayload = selectedIds.map((id) => ({
      _id: id,
      quantity: selectedServices[id].quantity,
      userId: selectedServices[id].userId,
    }));

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        'https://kami-backend-5rs0.onrender.com/transactions',
        {
          customerId: selectedCustomer,
          services: servicesPayload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Thành công', 'Đã tạo giao dịch mới!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo giao dịch!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Add transaction"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>
          Customer <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          data={customers}
          maxHeight={250}
          labelField="label"
          valueField="value"
          placeholder="Select custommer"
          value={selectedCustomer}
          onChange={(item) => setSelectedCustomer(item.value)}
        />

        <View style={{ marginTop: 15 }}>
          {services.map((item) => {
            const isChecked = !!selectedServices[item._id];
            const currentQty = selectedServices[item._id]?.quantity || 1;
            const currentExecutor = selectedServices[item._id]?.userId || null;

            return (
              <View key={item._id} style={styles.serviceBox}>
                <BouncyCheckbox
                  size={22}
                  fillColor="#E5536F"
                  unFillColor="#FFFFFF"
                  text={item.name}
                  iconStyle={{ borderColor: '#E5536F', borderRadius: 11 }}
                  innerIconStyle={{ borderRadius: 11 }}
                  textStyle={styles.checkboxText}
                  isChecked={isChecked}
                  onPress={() => toggleService(item._id)}
                />

                {isChecked && (
                  <View style={styles.serviceDetails}>
                    <View style={styles.rowControls}>
                      <View style={styles.stepper}>
                        <TouchableOpacity
                          style={styles.stepBtn}
                          onPress={() => changeQuantity(item._id, -1)}>
                          <Text style={styles.stepText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>{currentQty}</Text>

                        <TouchableOpacity
                          style={styles.stepBtn}
                          onPress={() => changeQuantity(item._id, 1)}>
                          <Text style={styles.stepText}>+</Text>
                        </TouchableOpacity>
                      </View>

                      <Dropdown
                        style={styles.executorDropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={executors}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder="Executor"
                        value={currentExecutor}
                        onChange={(e) => changeExecutor(item._id, e.value)}
                      />
                    </View>

                    <Text style={styles.priceLabel}>
                      Price:{' '}
                      <Text style={styles.priceValue}>
                        {formatMoney(item.price)}
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}>
        <Button
          mode="contained"
          style={styles.submitBtn}
          labelStyle={styles.submitBtnText}
          onPress={handleAddTransaction}
          disabled={loading}>
          {`See summary: (${formatMoney(calculateTotal())})`}
        </Button>
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#E5536F',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    padding: 16,
    paddingBottom: 110,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFF',
  },
  placeholder: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
  },
  serviceBox: {
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 15,
    color: '#333',
    textDecorationLine: 'none',
  },
  serviceDetails: {
    marginLeft: 32,
    marginTop: 8,
  },
  rowControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 12,
  },
  stepBtn: {
    width: 38, 
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#555',
  },
  qtyText: {
    width: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  executorDropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
    backgroundColor: '#FFF',
  },
  priceLabel: {
    fontSize: 13,
    color: '#333',
  },
  priceValue: {
    color: '#E5536F',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  submitBtn: {
    backgroundColor: '#E5536F',
    borderRadius: 10,
    paddingVertical: 4,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justify: 'center',
    alignItems: 'center',
  },
});

export default AddTransactionScreen;