import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { Colors, Fonts } from "../constants";

export default class TabViewCustom extends React.Component {
  static defaultProps = {
    selectedIndex: 0
  };

  state = {
    index: this.props.selectedIndex || 0,
    routes: this.props.titles.map((title, i) => ({ key: `${i}`, title }))
  };

  onIndexChange = index => {
    this.setState({ index });
  };

  renderScene = ({ route }: Object) => {
    let component = null;
    const { title } = route;
    this.state.routes.forEach((tab, idx) => {
      if (title === tab.title) {
        component = this.props.screens[idx];
      }
    });
    return component;
  };

  getLabelText = ({ route }: Object) => {
    return route.title;
  };

  renderTabBar = (props: Object) => {
    return (
      <TabBar
        {...props}
        getLabelText={this.getLabelText}
        useNativeDriver
        tabStyle={styles.androidTab}
        labelStyle={styles.androidTabsLabel}
        style={styles.androidTabBar}
        indicatorStyle={styles.indicatorStyle}
      />
    );
  };

  render() {
    return (
      <TabView
        style={styles.tabView}
        // backgroundColor={Config.colors.background} #FEFEFE
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={this.onIndexChange}
        renderTabBar={this.renderTabBar}
        tabBarPosition="top"
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1
  },
  scene: {
    flex: 1
  },
  androidTabBar: {
    height: 48,
    elevation: 0,
    backgroundColor: Colors.tintColor,
    borderBottomColor: "transparent",
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0
  },
  androidTabsLabel: {
    color: Colors.noticeText,
    fontFamily: Fonts.avenir,
    fontSize: 17
  },
  androidTab: {
    height: 44,
    padding: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    backgroundColor: Colors.tintColor
  },
  indicatorStyle: {
    backgroundColor: Colors.noticeText
  }
});
