import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from './screens/PantallaLogin';
import PantallaRegistro from './screens/PantallaRegistro';
import PantallaEscaneo from './screens/PantallaEscaneo';
import PantallaTerminos from './screens/PantallaTerminos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={PantallaLogin} />
        <Stack.Screen name="Registro" component={PantallaRegistro} />
        <Stack.Screen name="Escaneo" component={PantallaEscaneo} />
        <Stack.Screen name="Terminos" component={PantallaTerminos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
