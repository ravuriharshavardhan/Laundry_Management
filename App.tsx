// App.js
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import SchedulePickUpScreen from "./Src/screens/Main/SchedulePickUpScreen/SchedulePickUpScreen";
import MyOrdersScreen from "./Src/screens/Main/MyOrdersScreen/MyOrdersScreen";
import Ratelist from "./Src/screens/Main/RatelistScreen/RatelistScreen";
import ProfileScreen from "./Src/screens/Main/ProfileScreen/ProfileScreen";
import SignUp from "./Src/screens/Auth/Screens/Signup";
import SignUp2 from "./Src/screens/Auth/Screens/SignUp2";
import Login from "./Src/screens/Auth/Screens/Login";
import ManageCloths from "./Src/screens/Main/ManageCloths/ManageCloths";



// Color utility
const colors = {
  BottomBarColor: "#F49905",
};

// Stack & Tabs
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: colors.BottomBarColor,
        borderRadius: 50,
        marginHorizontal: 21,
        marginBottom: 20,
        height: 60,
        position: "absolute",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingBottom: 25,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
      },
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        const color = focused ? "#000" : "#fff";
        switch (route.name) {
          case "Calendar":
            return <MaterialIcon name="calendar-month" size={30} color={color} />;
          case "Cart":
            return <AntDesign name="shoppingcart" size={30} color={color} />;
          case "Payments":
            return <FontAwesome name="rupee" size={30} color={color} />;
          case "Profile":
            return <Ionicons name="person-outline" size={30} color={color} />;
          default:
            return <Ionicons name="ellipse" size={30} color={color} />;
        }
      },
    })}>
    <Tab.Screen name="Calendar" component={SchedulePickUpScreen} />
    <Tab.Screen name="Cart" component={MyOrdersScreen} />
    <Tab.Screen name="Payments" component={Ratelist} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Auth stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUp} />
    <Stack.Screen name="SignUp2" component={SignUp2} />
    <Stack.Screen name="MainTabs" component={HomeStack} />
  </Stack.Navigator>
);

// Home stack (main after auth)
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="ManageCloths" component={ManageCloths} />
  </Stack.Navigator>
);

// App
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isAuthenticated ? (
                <Stack.Screen name="Home" component={HomeStack} />
              ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#F49905",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
}); 