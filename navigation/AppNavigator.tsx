import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import MainTabNavigator from "./MainTabNavigator";
import AuthStackScreen from "./AuthNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
