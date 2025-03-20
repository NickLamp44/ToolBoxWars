import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/loginScreen";
import SignUp from "../screens/signUpScreen";
import HomeScreen from "../screens/homeScreen";

const Stack = createStackNavigator();

export default function AppNavigator(pProps) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
