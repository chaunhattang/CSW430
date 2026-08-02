import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Service from '../components/Service';
import axios from 'axios';

const HomeScreen = ({ token, setToken, setScreen, setSelectedService }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      setServices(response.data);

    } catch (error) {
      console.error('Error service list:', error);
      Alert.alert('Error', 'Cannot access service list');
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();

              setToken(null);

              setScreen('LOGIN');

              console.log('Sign Out!');
            } catch (error) {
              console.error('Error:', error);
              Alert.alert('Error', 'Cannot sign out');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchServices();
  }, []);



  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Huyền Trinh</Text>
        <IconButton
          icon="account-circle"
          size={30}
          color="white"
          onPress={handleLogout}
        />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.items}>Danh sách dịch vụ</Text>
        <IconButton
          icon="plus"
          size={20}
          color="#FFFFFF"
          style={{ backgroundColor: '#E5536F' }}
          onPress={() => setScreen('ADD')}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E5536F"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {services.map((item) => (
            <Service
              key={item._id || item.id}
              id={item._id || item.id}
              name={item.name}
              price={item.price}
              onPress={() => {
                setSelectedService(item);
                setScreen('DETAIL');
                console.log('SelectedService:', item.name);
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#E5536F',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  items: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
