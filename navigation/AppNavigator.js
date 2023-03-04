import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabNavigator from "./MainTabNavigator";
import AuthStackScreen from "./AuthNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer headerMode="none">
    <Stack.Navigator initialRouteName="Auth">
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
