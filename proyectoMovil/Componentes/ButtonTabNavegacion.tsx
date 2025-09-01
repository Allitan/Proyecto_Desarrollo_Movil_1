import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeStack from './HomeStack'
import Notificaciones from '../Pages/Notificaciones/Notificaciones'
import ControlarNotificaciones from '../Pages/ControlarNotificaciones/ControlarNotificaciones'

export default function BottonTabNavegacion() {

    const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeStack} options={{ headerShown: false}}/>
            <Tab.Screen name='Notificaciones' component={Notificaciones}/>
            <Tab.Screen name='ControlarNotificaciones' component={ControlarNotificaciones}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}