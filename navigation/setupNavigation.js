import { createStackNavigator } from "react-navigation";

// AuthStack
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";

const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: LoginScreen,
  Register: RegisterScreen
});

// const HelpersScreensStack = createStackNavigator({
//   InputData: InputDataScreen
// });

export { AuthStack };
