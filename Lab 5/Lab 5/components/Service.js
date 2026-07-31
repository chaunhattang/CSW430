import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Service = ({ id, name, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.price}>{price} đ</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 15,
    marginVertical: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  name: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginRight: 10,
  },
  price: {
    fontSize: 15,
    color: 'black',
  },
});

export default Service;
