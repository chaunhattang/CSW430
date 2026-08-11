import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen({ navigation }) {
  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E5536F' }}
      edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Appbar.Header style={styles.header} statusBarHeight={0}>
          <Appbar.Content
            title="Setting"
            color="white"
            titleStyle={styles.headerTitle}
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{ fontWeight: 'bold' }}
            onPress={handleLogout}>
            Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E5536F',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
    padding: 20,
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#E5536F',
    borderRadius: 8,
    paddingVertical: 4,
  },
});
