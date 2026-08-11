import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MyStack from './navigation/MyStack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E5536F',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#000000',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}