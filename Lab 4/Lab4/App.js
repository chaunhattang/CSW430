import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Store from './src/Store';
import Contacts from './src/Contact';
import ProfileContact from './src/ProfileContact';
import Favorites from './src/Favorites';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ContactsScreens({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="ContactsList">
            <Stack.Screen
                name="ContactsList"
                component={Contacts}
                options={{
                    title: "Contacts",
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                            onPress={() => navigation.toggleDrawer()} // Mở menu Drawer
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{ title: "Profile contact" }}
            />
        </Stack.Navigator>
    );
}

function FavoriteScreens({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="FavoritesList">
            <Stack.Screen
                name="FavoritesList"
                component={Favorites}
                options={{
                    title: "Favorites",
                    headerLeft: () => (
                        <Icon
                            name="menu"
                            size={28}
                            color="black"
                            style={{ marginLeft: 15 }}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="ProfileContact"
                component={ProfileContact}
                options={{ title: "Profile contact" }}
            />
        </Stack.Navigator>
    );
}

// function ContactsScreens() {
//     return (
//         <Stack.Navigator
//             initialRouteName="Contacts"
//             screenOptions={{ headerShown: true }}
//         >
//             <Stack.Screen
//                 name="Contacts"
//                 component={Contacts}
//                 options={{ title: "Contacts" }}
//             />
//             <Stack.Screen
//                 name="ProfileContact"
//                 component={ProfileContact}
//                 options={{ title: "Profile contact" }}
//             />
//         </Stack.Navigator>
//     );
// }

// function FavoriteScreens() {
//     return (
//         <Stack.Navigator
//             initialRouteName="Favorites"
//             screenOptions={{ headerShown: true }}
//         >
//             <Stack.Screen
//                 name="Favorites"
//                 component={Favorites}
//                 options={{ title: "Favorites" }}
//             />
//             <Stack.Screen
//                 name="ProfileContact"
//                 component={ProfileContact}
//                 options={{ title: "Profile contact" }}
//             />
//         </Stack.Navigator>
//     );
// }
const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='ContactsScreens'
            barStyle={{ backgroundColor: "blue" }}
            labeled={false}
            activeColor={"#e5e5e5"}
            inactiveColor={"#a9a9a9"}
        >
            <Tab.Screen
                name="ContactsTab"
                component={ContactsScreens}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="format-list-bulleted" size={26} color={color} />,
                }}
            />
            <Tab.Screen
                name="FavoritesTab"
                component={FavoriteScreens}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="star" size={26} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="ContactsTab">
            <Drawer.Screen
                name="ContactsTab"
                component={ContactsScreens}
                options={{ drawerLabel: 'Contacts' }}
            />
            <Drawer.Screen
                name="FavoritesTab"
                component={FavoriteScreens}
                options={{ drawerLabel: 'Favorites' }}
            />
        </Drawer.Navigator>
    );
}

const App = () => {
    return (
        // <Provider store={Store}>
        <NavigationContainer>
            {/* <TabNavigator /> */}
            <Drawer.Navigator
                initialRouteName="ContactsDrawer"
                screenOptions={{ headerShown: false }}
            >
                <Drawer.Screen
                    name="ContactsDrawer"
                    component={ContactsScreens}
                    options={{
                        drawerLabel: 'Contacts',
                        drawerIcon: ({ color }) => <Icon name="format-list-bulleted" size={24} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="FavoritesDrawer"
                    component={FavoriteScreens}
                    options={{
                        drawerLabel: 'Favorites',
                        drawerIcon: ({ color }) => <Icon name="star" size={24} color={color} />,
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
        // </Provider>
    );
}

export default App;