import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import MyDeliveriesScreen from "../screens/MyDeliveriesScreen";
import AllDeliveriesScreen from "../screens/AllDeliveriesScreen";
import ProfileScreen from "../screens/UserProfileScreen";

import CreateDeliveryScreen from "../screens/CreateDeliveryScreen";
import InputDataScreen from "../screens/InputDataScreen";
import DeliveryDetailsScreen from "../screens/DeliveryDetailsScreen";
import ApplicantsListScreen from "../screens/ApplicantsListScreen";
import FilterAllDeliveriesScreen from "../screens/AllDeliveriesScreen/FilterAllDeliveriesScreen";

import ChatListScreen from "../screens/ChatListScreen";
import ConversationScreen from "../screens/ChatListScreen/ConversationScreen";

const MyDeliveriesStack = createNativeStackNavigator();
const AllDeliveriesStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MyDeliveriesStackScreen = () => (
  <MyDeliveriesStack.Navigator>
    <MyDeliveriesStack.Screen
      name="MyDeliveries"
      component={MyDeliveriesScreen}
    />
    <MyDeliveriesStack.Screen
      name="DeliveryDetails"
      component={DeliveryDetailsScreen}
    />
    <MyDeliveriesStack.Screen
      name="ApplicantsList"
      component={ApplicantsListScreen}
    />
  </MyDeliveriesStack.Navigator>
);

const AllDeliveriesStackScreen = () => (
  <AllDeliveriesStack.Navigator>
    <AllDeliveriesStack.Screen
      name="AllDeliveries"
      component={AllDeliveriesScreen}
    />
    <AllDeliveriesStack.Screen
      name="CreateDelivery"
      component={CreateDeliveryScreen}
    />
    <AllDeliveriesStack.Screen name="InputData" component={InputDataScreen} />
    <AllDeliveriesStack.Screen
      name="DeliveryDetails"
      component={DeliveryDetailsScreen}
    />
    <AllDeliveriesStack.Screen
      name="ApplicantsList"
      component={ApplicantsListScreen}
    />
    <AllDeliveriesStack.Screen
      name="FilterAllDeliveries"
      component={FilterAllDeliveriesScreen}
    />
  </AllDeliveriesStack.Navigator>
);

const ChatStackScreen = () => (
  <ChatStack.Navigator>
    <ChatStack.Screen name="ChatList" component={ChatListScreen} />
    <ChatStack.Screen name="ConversationPage" component={ConversationScreen} />
  </ChatStack.Navigator>
);


const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="AllDeliveriesStack"
      component={AllDeliveriesStackScreen}
      options={{
        tabBarLabel: "Список доставок",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ChatStack"
      component={ChatStackScreen}
      options={{
        tabBarLabel: "Чати",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? `ios-chatboxes` : "md-chatboxes"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="MyDeliveriesStack"
      component={MyDeliveriesStackScreen}
      options={{
        tabBarLabel: "Мої доставки",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? `ios-filing` : "md-filing"}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Профіль",
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;