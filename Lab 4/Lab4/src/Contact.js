import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import ContactListItem from './ContactListItem';
import { getContacts } from './Store';

const keyExtractor = (item) => item.id;

const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getContacts();
            setContacts(data);
        };
        fetchData();
        return navigation.addListener('focus', fetchData);
    }, []);

    const renderContacts = ({ item }) => {
        return (
            <ContactListItem
                name={item.name}
                avatar={item.avatar}
                phone={item.phone}
                onPress={() => navigation.navigate("ProfileContact", { contact: item })}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={keyExtractor}
                renderItem={renderContacts}
                extraData={contacts}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    center: {
        alignItems: 'center'
    }
});

export default Contacts;