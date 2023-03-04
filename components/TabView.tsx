import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar, SceneRendererProps } from "react-native-tab-view";

import { Colors, Fonts } from "../constants";

type Props = {
  selectedIndex: number;
  titles: Array<string>;
  screens: Array<React.ReactNode>;
};

interface CustomSceneRendererProps extends SceneRendererProps {
  route: {
    key: string;
    title: string;
  };
}

class TabViewCustom extends React.Component<Props> {
  static defaultProps = {
    selectedIndex: 0,
  };

  state = {
    index: this.props.selectedIndex || 0,
    routes: this.props.titles.map((title, i) => ({ key: `${i}`, title })),
  };

  onIndexChange = (index: string) => {
    this.setState({ index });
  };

  renderScene = ({ route }: CustomSceneRendererProps) => {
    let component: React.ReactNode | null = null;
    const { title } = route;
    this.state.routes.forEach((tab, idx) => {
      if (title === tab.title) {
        component = this.props.screens[idx];
      }
    });
    return component;
  };

  getLabelText = ({ route }: CustomSceneRendererProps) => {
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
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  androidTabBar: {
    height: 48,
    elevation: 0,
    backgroundColor: Colors.tintColor,
    borderBottomColor: "transparent",
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0,
  },
  androidTabsLabel: {
    color: Colors.noticeText,
    fontFamily: Fonts.avenir,
    fontSize: 17,
  },
  androidTab: {
    height: 44,
    padding: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    backgroundColor: Colors.tintColor,
  },
  indicatorStyle: {
    backgroundColor: Colors.noticeText,
  },
});

export default TabViewCustom;
