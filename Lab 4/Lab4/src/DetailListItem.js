import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailListItem = ({ icon, title, subtitle }) => {
    return (
        <View style={styles.borderContainer}>
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    {icon &&
                        <Icon name={icon} size={24} color="black" style={styles.icon} />
                    }
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{title}</Text>
                        {subtitle &&
                            <Text style={styles.subtitle}>{subtitle}</Text>
                        }
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    borderContainer: {
        paddingLeft: 24,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 24,
        borderBottomColor: 'grey',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 24,
    },
    contentContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    }, subtitle: {
        color: 'blue',
        fontSize: 15,
        marginTop: 4,
    }
});

export default DetailListItem;