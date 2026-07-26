import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../constants/colors';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MatkulStack = createNativeStackNavigator();

const stackHeaderOptions = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
};

// Stack khusus tab "Matkul" agar HomeScreen -> DetailScreen tetap punya header + back button
function MatkulStackNavigator() {
  return (
    <MatkulStack.Navigator screenOptions={stackHeaderOptions}>
      <MatkulStack.Screen name="Beranda" component={HomeScreen} options={{ headerShown: false }} />
      <MatkulStack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Mata Kuliah' }} />
    </MatkulStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => {
          const iconMap = {
            Matkul: 'book-outline',
            Progres: 'checkmark-done-outline',
            Profil: 'person-outline',
          };
          return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Matkul" component={MatkulStackNavigator} options={{ title: 'Mata Kuliah' }} />
      <Tab.Screen name="Progres" component={ProgressScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="MainTabs" component={MainTabs} />
    </RootStack.Navigator>
  );
}