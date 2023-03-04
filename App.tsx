import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { Store } from "redux";

import AppNavigator from "./navigation/AppNavigator";
import configureStore from "./store/configureStore";

const store: Store = configureStore();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
