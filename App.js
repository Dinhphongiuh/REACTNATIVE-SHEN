import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screen/HomeScreen";
import AccountScreen from './screen/AccountScreen';
import sigUpScreen from './screen/signUpScreen';
import Login from "./screen/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false, gestureEnabled: false}}
        ></Stack.Screen>
        <Stack.Screen
          name="accountScreen"
          component={AccountScreen}
          options={{headerShown: false}}
        ></Stack.Screen>
        <Stack.Screen
          name="SigupScreen"
          component={sigUpScreen}
          options={{headerShown: false}}
        ></Stack.Screen>
        <Stack.Screen
          name="loginScreen"
          component={Login}
          options={{headerShown: false}}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};