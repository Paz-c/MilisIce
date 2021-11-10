import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import CartScreen from './CartScreen';
import ProfileScreen from './ProfileScreen';
import TrackScreen from './TrackScreen';
import BuildScreen from './BuildScreen';

const MyTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="home" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="locate" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="cart" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Build"
        component={BuildScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="color-wand" size={30} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="person" size={30} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
