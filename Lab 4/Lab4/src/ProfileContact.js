import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ContactThum from './ContactThum';
import DetailListItem from './DetailListItem';
import { IconButton } from 'react-native-paper';
import { toggleFavoriteStatus } from './Store';

const ProfileContact = ({ route }) => {
    const { contact } = route.params;
    const [isFavorite, setIsFavorite] = useState(contact.favorite);

    const handleToggleFavorite = async () => {
        const newStatus = !isFavorite;
        setIsFavorite(newStatus);

        await toggleFavoriteStatus(contact.id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThum avatar={contact.avatar} name={contact.name} phone={contact.phone} />
            </View>
            <View style={styles.detailsSection}>
                <DetailListItem icon="mail" title="Email" subtitle={contact.email} />
                <DetailListItem icon="phone" title="Work" subtitle={contact.phone} />
                <DetailListItem icon="smartphone" title="Personal" subtitle={contact.cell} />
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <IconButton
                        icon={isFavorite ? "star" : "star-outline"}
                        iconColor={isFavorite ? "#663399" : "gray"}
                        size={40}
                        onPress={handleToggleFavorite}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightblue'
    },
    detailsSection: {
        flex: 1,
        backgroundColor: 'white'
    },
});

export default ProfileContact;