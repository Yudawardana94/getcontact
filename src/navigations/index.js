import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import { StyleSheet, Text, View } from 'react-native'

const Stack = createStackNavigator()
import HomeScreen from '../screens/home'
import DetailScreen from '../screens/detail'
import EditContactScreen from '../screens/editContact'
import AddContactScreen from '../screens/addContact'

const navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Edit" component={EditContactScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Add" component={AddContactScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default navigation