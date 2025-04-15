// AuthStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Auth/Screens/Login";
import Signin from "../screens/Auth/Screens/Signup";
import SignUp2 from "../screens/Auth/Screens/SignUp2";


const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signin} />
    <Stack.Screen name="SignUp2" component={SignUp2} />
  </Stack.Navigator>
);

export default AuthStack;
