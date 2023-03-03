import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import { AuthStack } from "./setupNavigation";

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Main: MainTabNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
