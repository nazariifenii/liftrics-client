import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs"

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

const MyDeliveriesStack = createStackNavigator({
  MyDeliveries: MyDeliveriesScreen,
  DeliveryDetails: DeliveryDetailsScreen,
  ApplicantsList: ApplicantsListScreen
});

MyDeliveriesStack.navigationOptions = {
  tabBarLabel: "Мої доставки",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-filing` : "md-filing"}
    />
  )
};

const AllDeliveriesStack = createStackNavigator({
  AllDeliveries: AllDeliveriesScreen,
  CreateDelivery: CreateDeliveryScreen,
  InputData: InputDataScreen,
  DeliveryDetails: DeliveryDetailsScreen,
  ApplicantsList: ApplicantsListScreen,
  FilterAllDeliveries: FilterAllDeliveriesScreen
});

AllDeliveriesStack.navigationOptions = {
  tabBarLabel: "Список доставок",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
    />
  )
};

const ChatStack = createStackNavigator({
  ChatList: ChatListScreen,
  ConversationPage: ConversationScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: "Чати",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-chatboxes` : "md-chatboxes"}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Профіль",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
    />
  )
};

export default createBottomTabNavigator({
  AllDeliveriesStack,
  ChatStack,
  MyDeliveriesStack,
  ProfileStack
});
