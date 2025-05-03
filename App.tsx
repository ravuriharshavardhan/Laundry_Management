import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './Src/Redux/Store/Store';

// Icons
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import SchedulePickUpScreen from './Src/screens/Main/SchedulePickUpScreen/SchedulePickUpScreen';
import MyBookingScreen from './Src/screens/Main/MyBookingScreen/MyBookingScreen';
import Ratelist from './Src/screens/Main/RatelistScreen/RatelistScreen';
import ProfileScreen from './Src/screens/Main/ProfileScreen/ProfileScreen';
import SignUp from './Src/screens/Auth/Screens/Signup';
import SignUp2 from './Src/screens/Auth/Screens/SignUp2';
import Login from './Src/screens/Auth/Screens/Login';
import ManageCloths from './Src/screens/Main/ManageCloths/ManageCloths';
import AddCloths from './Src/screens/Main/ManageCloths/AddCloths';
import UserListScreen from './Src/screens/Admin/UsersList/UsersListScreen';
import RatelistInfo from './Src/screens/Main/RatelistScreen/RatelistInfo';
import UserComplaint from './Src/screens/Main/UserComplaint/UserComplaint';
import UsersListScreen from './Src/screens/Admin/UsersList/UsersListScreen';
import AddressManagementScreen from './Src/screens/Main/AddressManagementScreen/AddressManagementScreen';
import AddAddressScreen from './Src/screens/Main/AddressManagementScreen/AddAddressScreen';
import OrderInfoScreen from './Src/screens/Main/ManageCloths/OrderInfoScreen';
import ForgotPassword from './Src/screens/Auth/Screens/ForgotPassword';
import LaundryDetailScreen from './Src/screens/Main/LaundryDetailScreen/LaundryDetailScreen';
import DryCleaning from './Src/screens/Info/DryCleaning';
import ScheduleScreen from './Src/screens/Main/ScheduleScreen/ScheduleScreen';
import HomeCare from './Src/screens/Info/HomeCare';
import Ironing from './Src/screens/Info/Ironing';
import CarpetCleaning from './Src/screens/Info/CarpetCleaning';
import DriverDashBoard from './Src/screens/Driver/Screen/DriverDashBoard';
import AssignmentScreen from './Src/screens/Driver/Screen/AssignmentScreen';
import DriverReportScreen from './Src/screens/Driver/Screen/DriverReportScreen';
import DeliveryOrders from './Src/screens/Driver/Screen/DriverOrdersScreen';
import OrderListScreen from './Src/screens/Driver/Screen/OrderListScreen';
import OrderDetailsScreen from './Src/screens/Driver/Screen/OrderDetailsScreen';
import DeliveredOrders from './Src/screens/Driver/Screen/DeliveredOrders';
import OrderDetails from './Src/screens/Driver/Screen/OrderDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  BottomBarColor: '#F49905',
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarStyle: {
        backgroundColor: colors.BottomBarColor,
        borderRadius: 50,
        marginHorizontal: 21,
        marginBottom: 20,
        height: 60,
        position: 'absolute',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingBottom: Platform.OS === 'ios' ? 10 : 25,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
      },
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({focused}) => {
        const color = focused ? '#000' : '#fff';
        switch (route.name) {
          case 'Calendar':
            return (
              <MaterialIcon name="calendar-month" size={30} color={color} />
            );
          case 'Cart':
            return <AntDesign name="shoppingcart" size={30} color={color} />;
          case 'Payments':
            return <FontAwesome name="rupee" size={30} color={color} />;
          case 'Profile':
            return <Ionicons name="person-outline" size={30} color={color} />;
          default:
            return <Ionicons name="ellipse" size={30} color={color} />;
        }
      },
      tabBarHideOnKeyboard: true,
    })}>
    <Tab.Screen name="Calendar" component={SchedulePickUpScreen} />
    <Tab.Screen name="Cart" component={ManageCloths} />
    <Tab.Screen name="Payments" component={Ratelist} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);


const DriverTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor: colors.BottomBarColor,
        borderRadius: 50,
        marginHorizontal: 21,
        marginBottom: 20,
        height: 60,
        position: 'absolute',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingBottom: Platform.OS === 'ios' ? 10 : 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
      },
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIcon: ({ focused }) => {
        const color = focused ? '#000' : '#fff';
        switch (route.name) {
          case 'DriverDashboard':
            return <Ionicons name="grid-outline" size={28} color={color} />;
          case 'DriverOrders':
            return <MaterialIcon name="truck-delivery" size={28} color={color} />;
          case 'DriverAssignment':
            return <FontAwesome name="users" size={28} color={color} />;
          case 'DriverReport':
            return <AntDesign name="linechart" size={28} color={color} />;
          default:
            return <Ionicons name="ellipse" size={28} color={color} />;
        }
      },
      tabBarHideOnKeyboard: true,
      tabBarIconStyle: {
   top:     10,
      },
    })}
  >
    <Tab.Screen name="DriverDashboard" component={DriverDashBoard} />
    <Tab.Screen name="DriverOrders" component={DeliveryOrders} />
    <Tab.Screen name="DriverAssignment" component={AssignmentScreen} />
    <Tab.Screen name="DriverReport" component={DriverReportScreen} />
  </Tab.Navigator>
);

const DeliveryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DriverTabs" component={DriverTabs} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
    <Stack.Screen name="DeliveryOrders" component={DeliveryOrders} />
    <Stack.Screen name="AssignedOrders" component={AssignmentScreen} />
    <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
    <Stack.Screen name="OrderDetails" component={OrderDetails} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUp} />
    <Stack.Screen name="SignUp2" component={SignUp2} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="DryCleaning" component={DryCleaning} />
    <Stack.Screen name="UsersListScreen" component={UsersListScreen} />
    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    <Stack.Screen name="MyBookings" component={MyBookingScreen} />
    <Stack.Screen name="DriverTabs" component={DriverTabs} />
    <Stack.Screen
      name="AddressManagement"
      component={AddressManagementScreen}
    />
    <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
    <Stack.Screen name="OrderSummaryScreen" component={OrderInfoScreen} />
    <Stack.Screen name="HomeCare" component={HomeCare} />
    <Stack.Screen name="ironing" component={Ironing} />
    <Stack.Screen name="CarpetCleaning" component={CarpetCleaning} />
    <Stack.Screen name="RateListDetail" component={RatelistInfo} />
    
  </Stack.Navigator>
);
const HomeStack = () => (
  <Stack.Navigator initialRouteName='UsersListScreen' screenOptions={{headerShown: false}}>

    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MyBookings" component={MyBookingScreen} />
    <Stack.Screen name="UserComplaint" component={UserComplaint} />
    <Stack.Screen name="AddCloths" component={AddCloths} />
    <Stack.Screen name="UserListScreen" component={UserListScreen} />
    <Stack.Screen name="RateListDetail" component={RatelistInfo} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

    <Stack.Screen
      name="AddressManagement"
      component={AddressManagementScreen}
    />
    <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
    <Stack.Screen name="OrderSummaryScreen" component={OrderInfoScreen} />
    <Stack.Screen name="LaundryDetail" component={LaundryDetailScreen} />
    <Stack.Screen name="DryCleaning" component={DryCleaning} />
    <Stack.Screen name="HomeCare" component={HomeCare} />
    <Stack.Screen name="ironing" component={Ironing} />
    <Stack.Screen name="CarpetCleaning" component={CarpetCleaning} />
    <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
  </Stack.Navigator>
);


const AppNavigation = () => {
  const {isAuthenticated, user} = useSelector(state => state.auth);

  if (isAuthenticated === null) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isDelivery =
    user?.email === '99210041731@klu.ac.in' && user?.role === 'Delivery';
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          isDelivery ? (
            <Stack.Screen name="Delivery" component={DeliveryStack} />
          ) : (
            <Stack.Screen name="Home" component={HomeStack} />
          )
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});
