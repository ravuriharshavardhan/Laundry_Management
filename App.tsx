// App.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";


import AuthStack from "./Source/navigation/AuthStack";
import SchedulePickUpScreen from "./Source/screens/Main/SchedulePickUpScreen/SchedulePickUpScreen";
import MyOrdersScreen from "./Source/screens/Main/MyOrdersScreen/MyOrdersScreen";
import Ratelist from "./Source/screens/Main/RatelistScreen/RatelistScreen";
import ProfileScreen from "./Source/screens/Main/ProfileScreen/ProfileScreen";
import colors from "./Source/utils/colors";


const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
  tabBarStyle: {
    backgroundColor: colors.BottomBarColor,
    borderRadius: 50,
marginHorizontal:21,

    marginBottom: 20,
    height: 60,
    position: "absolute",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 25,
    justifyContent: "center", // Center the content of the tab bar
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Ensure the icons are vertically centered
    paddingLeft: 0, // Remove any extra left padding
    paddingRight: 0, // Remove any extra right padding
    width: "90%", // Ensure it takes full width
  },
  tabBarShowLabel: false,
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Calendar") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MaterialIcon
            name="calendar-month"
            size={30}
            color={focused ? "#000" : "#fff"}
          />
        </View>
      );
    } else {
      if (route.name === "Cart") {
        return(
          <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AntDesign
          name="shoppingcart"
          size={30}
          color={focused ? "#000" : "#fff"}
        />
      </View>

        )
        
      } else if (route.name === "Payments") {
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <FontAwesome
              name="rupee"
              size={30}
              color={focused ? "#000" : "#fff"}
            />
          </View>
        );
      } else if (route.name === "Profile") {
        return (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Ionicons
              name="person-outline"
              size={30}
              color={focused ? "#000" : "#fff"}
            />
          </View>
        );
      }

      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Icon name={iconName} size={32}          color={focused ? "#000" : "#fff"} />
        </View>
      );
    }
  },
})}

  >
    <Tab.Screen name="Calendar" component={SchedulePickUpScreen} />
    <Tab.Screen name="Cart" component={MyOrdersScreen} />
    <Tab.Screen name="Payments" component={Ratelist} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);


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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
