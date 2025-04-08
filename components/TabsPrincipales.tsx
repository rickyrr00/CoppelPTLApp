import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantallaInicio from '../screens/PantallaInicio';
import PantallaEscaneo from '../screens/PantallaEscaneo';
import PantallaPerfil from '../screens/PantallaPerfil';

const Tab = createBottomTabNavigator();

const TabsPrincipales = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={PantallaInicio} />
      <Tab.Screen name="Escaneo" component={PantallaEscaneo} />
      <Tab.Screen name="Perfil" component={PantallaPerfil} />
    </Tab.Navigator>
  );
};

export default TabsPrincipales;
