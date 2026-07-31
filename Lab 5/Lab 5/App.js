import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuProvider } from 'react-native-popup-menu';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import EditServiceScreen from './screens/EditServiceScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('LOGIN');
  const [selectedService, setSelectedService] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const savedToken = await AsyncStorage.getItem('userToken');
      if (savedToken) {
        setToken(savedToken);
        setCurrentScreen('HOME');
      }
    };
    checkLogin();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'LOGIN':
        return <LoginScreen setToken={setToken} setScreen={setCurrentScreen} />;
      case 'HOME':
        return (
          <HomeScreen
            token={token}
            setToken={setToken}
            setScreen={setCurrentScreen}
            setSelectedService={setSelectedService}
          />
        );
      case 'ADD':
        return <AddServiceScreen token={token} setScreen={setCurrentScreen} />;
      case 'DETAIL':
        return (
          <ServiceDetailScreen
            service={selectedService}
            token={token}
            setScreen={setCurrentScreen}
            setSelectedService={setSelectedService}
          />
        );
      case 'EDIT':
        return (
          <EditServiceScreen
            service={selectedService}
            token={token}
            setScreen={setCurrentScreen}
          />
        );
      default:
        return <LoginScreen setToken={setToken} setScreen={setCurrentScreen} />;
    }
  };

  return (
    <MenuProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {renderScreen()}
      </SafeAreaView>
    </MenuProvider>
  );
};

export default App;