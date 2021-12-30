import React from "react"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { ListContact, FormContact, DetailListContact } from "../screens"

const Stack = createStackNavigator()

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListContact" component={ListContact} options={{ headerShown: false }} />
        <Stack.Screen name="FormContact" component={FormContact} options={{ headerShown: false }} />
        <Stack.Screen name="DetailListContact" component={DetailListContact} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
