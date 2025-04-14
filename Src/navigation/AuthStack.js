// AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Screens/Login";
import Signin from "../screens/Auth/Screens/Signup";


const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signin" component={Signin} />
  </Stack.Navigator>
);

export default AuthStack;
