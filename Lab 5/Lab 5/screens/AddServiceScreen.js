import { useState } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button, Appbar } from 'react-native-paper';

const AddServiceScreen = ({ token, setScreen }) => {
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!serviceName.trim()) {
      Alert.alert('Error', 'Enter service name!');
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      Alert.alert('Error', 'Error with price!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: serviceName.trim(),
            price: Number(price),
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Sucess', 'Added service successfully!');
        setServiceName('');
        setPrice('');
        setScreen('HOME');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Cannot add service!');
      }
    } catch (error) {
      Alert.alert('Error', 'Cannot access server!');
      console.error('Add Service Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#E5536F' }}>
        <Appbar.BackAction color="white" onPress={() => setScreen('HOME')} />
        <Appbar.Content
          title="Add Service"
          color="white"
          titleStyle={styles.headerTitle}
        />
      </Appbar.Header>

      <View style={styles.formContainer}>
        <Text style={styles.label}>
          Service name
          <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a service name"
          placeholderTextColor="#999"
          value={serviceName}
          onChangeText={setServiceName}
        />

        <Text style={styles.label}>
          Price <Text style={{ color: 'red' }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#333"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={handleAdd}
          labelStyle={styles.buttonText}>
          {loading ? 'Adding...' : 'Add'}
        </Button>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#E5536F" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F2F2F7',
    height: 50,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: '#E5536F',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#E5536F',
    fontWeight: 'bold',
  },
});
export default AddServiceScreen;
