import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import ContactThum from './ContactThum';
import { getContacts } from './Store';

const keyExtractor = (item) => item.id;

const Favorites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getContacts();
            setFavorites(data.filter(contact => contact.favorite));
        };
        fetchData();
        return navigation.addListener('focus', fetchData);
    }, []);

    const renderFavoriteThumbnail = ({ item }) => {
        return (
            <ContactThum
                avatar={item.avatar}
                onPress={() => navigation.navigate('ProfileContact', { contact: item })}
            />
        );
    };

    if (favorites.length === 0) {
        return (
            <View style={[styles.container, { alignItems: 'center' }]}>
                <Text>You don't have any favorite contacts yet.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}
                extraData={favorites}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: "white", justifyContent: 'center', flex: 1 },
    list: { alignItems: 'center', padding: 10 },
});

export default Favorites;