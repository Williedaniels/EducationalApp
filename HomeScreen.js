// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Lessons = () => (
    <View>
        <Text>Lessons</Text>
        {/* Add list of lessons here */}
    </View>
);

const Search = () => (
    <View>
        <Text>Search</Text>
        {/* Add search functionality here */}
    </View>
);

const ModelUN = () => (
    <View>
        <Text>Model UN</Text>
        {/* Add Model UN content here */}
    </View>
);

const Profile = () => (
    <View>
        <Text>Profile</Text>
        {/* Add profile edit functionality here */}
    </View>
);

const HomeScreen = () => (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Lessons} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Model UN" component={ModelUN} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default HomeScreen;