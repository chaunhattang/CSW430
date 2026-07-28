import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

export const mapContacts = (contact) => {
    const { name, picture, phone, cell, email } = contact;
    return {
        id: v4(),
        name: name.first + ' ' + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() < 0.1 ? true : false,
    };
};

export const getContacts = async () => {
    try {
        const storedContacts = await AsyncStorage.getItem('@contacts');
        if (storedContacts !== null) {
            return JSON.parse(storedContacts);
        } else {
            const response = await fetch("https://randomuser.me/api/?results=50");
            const data = await response.json();
            const mappedContacts = data.results.map(mapContacts);
            await AsyncStorage.setItem('@contacts', JSON.stringify(mappedContacts));
            return mappedContacts;
        }
    } catch (error) {
        console.error("Error Getting Contacts: ", error);
        return [];
    }
};

export const toggleFavoriteStatus = async (id) => {
    try {
        const storedContacts = await AsyncStorage.getItem('@contacts');
        if (storedContacts !== null) {
            const contacts = JSON.parse(storedContacts);
            const updatedContacts = contacts.map(contact =>
                contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
            );
            await AsyncStorage.setItem('@contacts', JSON.stringify(updatedContacts));
            return updatedContacts;
        }
    } catch (error) {
        console.error("Error Updating Favorite: ", error);
    }
};