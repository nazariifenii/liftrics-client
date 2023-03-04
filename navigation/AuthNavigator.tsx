import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welckome"
      component={WelcomeScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="SignIn"
      component={LoginScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);

export default AuthStack;
