// @flow
import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { connect } from "react-redux";

class AuthLoadingScreen extends React.Component {
  componentWillMount() {
    this.bootstrapAsync();
  }
  componentDidUpdate() {
    console.log(this.props.userToken);
  }
  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      this.props.userToken.length ? "App" : "Auth"
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.auth.userToken
  };
};

export default connect(mapStateToProps)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
