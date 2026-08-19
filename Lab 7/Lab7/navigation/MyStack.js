import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';

import LoginScreen from '../screens/systems/LoginScreen';
import SettingScreen from '../screens/systems/SettingScreen';

import AddServiceScreen from '../screens/services/AddServiceScreen';
import ServiceDetailScreen from '../screens/services/ServiceDetailScreen';
import EditServiceScreen from '../screens/services/EditServiceScreen';

import AddCustomerScreen from '../screens/customers/AddCustomerScreen';
import CustomerDetailScreen from '../screens/customers/CustomerDetailScreen';
import EditCustomerScreen from '../screens/customers/EditCustomerScreen';

import TransactionDetailScreen from '../screens/transactions/TransactionDetailScreen';
import AddTransactionScreen from '../screens/transactions/AddTransactionScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#ffffff' },
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      
      {/* Services */}
      <Stack.Screen name="AddService" component={AddServiceScreen} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
      <Stack.Screen name="EditService" component={EditServiceScreen} />
      
      {/* Customers */}
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} />
      <Stack.Screen name="EditCustomer" component={EditCustomerScreen} />

      {/* Transactions */}
      <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default MyStack;