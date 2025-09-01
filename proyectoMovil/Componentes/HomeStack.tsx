import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Pages/Home/Home'
import FormularioEvento from '../Pages/FormularioEvento/FormularioEvento'

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='FormularioEvento' component={FormularioEvento} options={{ title: 'Agregar Evento' }} />
    </Stack.Navigator>
  )
}