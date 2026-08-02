import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import EditServiceScreen from './screens/EditServiceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('userToken');
        if (savedToken) {
          setInitialRoute('Home');
        }
      } catch (error) {
        console.error('Lỗi kiểm tra token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E5536F" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <MenuProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Add" component={AddServiceScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Detail" component={ServiceDetailScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Edit" component={EditServiceScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </MenuProvider>
    </SafeAreaProvider>
  );
}