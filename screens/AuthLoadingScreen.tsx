  import React from "react";
  import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
  import { connect } from "react-redux";
  import { NavigationProp } from "@react-navigation/native";

  type Props = {
    navigation: NavigationProp<any, any>;
    userToken: string;
  };

  class AuthLoadingScreen extends React.Component<Props> {
    componentWillMount() {
      this.bootstrapAsync();
    }
    componentDidUpdate() {
      console.log(this.props.userToken);
    }
    bootstrapAsync = () => {
      this.props.navigation.navigate(
        this.props.userToken.length ? "App" : "Auth"
      );
    };

    render() {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      userToken: state.auth.userToken,
    };
  };

  export default connect(mapStateToProps)(AuthLoadingScreen);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
