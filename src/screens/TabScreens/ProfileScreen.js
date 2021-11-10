import React from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HistoryScreen from '../DrawerScreens/HistoryScreen';
import Dashboard from '../DrawerScreens/Dashboard';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="History" component={HistoryScreen} />
      </Drawer.Navigator>
    );
  }
 
const ProfileScreen = () => {
  return (
    <MyDrawer />
  );
};

export default ProfileScreen;
