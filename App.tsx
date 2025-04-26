import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import PantallaLogin from './screens/PantallaLogin';
import PantallaRegistro from './screens/PantallaRegistro';
import PantallaTerminos from './screens/PantallaTerminos';
import PantallaEscaneo from './screens/PantallaEscaneo';
import PantallaInicio from './screens/PantallaInicio';
import PantallaPerfil from './screens/PantallaPerfil';
import PantallaAsignarColor from './screens/PantallaAsignarColor'; // 👈 nuevo import

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Inicio') iconName = 'home-outline';
          else if (route.name === 'Escaneo') iconName = 'scan-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#0071ce',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={PantallaInicio} />
      <Tab.Screen name="Escaneo" component={PantallaEscaneo} />
      <Tab.Screen name="Perfil" component={PantallaPerfil} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={PantallaLogin} />
          <Stack.Screen name="Registro" component={PantallaRegistro} />
          <Stack.Screen name="Terminos" component={PantallaTerminos} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="PantallaAsignarColor" component={PantallaAsignarColor} /> {/* 👈 nuevo screen */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
