import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddTransactionScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#E5536F' }}
      edges={['top']}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Appbar.Header
          style={{ backgroundColor: '#E5536F' }}
          statusBarHeight={0}>
          <Appbar.BackAction
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Appbar.Content
            title="Add Transaction"
            color="white"
            titleStyle={{ fontWeight: 'bold' }}
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Text style={styles.text}>Nothing</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AddTransactionScreen;
