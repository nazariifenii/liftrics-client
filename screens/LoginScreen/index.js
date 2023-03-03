// @flow

import React from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, Input } from "react-native-elements";

import { tryAuth } from "../../store/actions";
import styles from "./styles";

type Props = {};

class LoginScreen extends React.Component<Props, void> {
  state = {
    phoneInputValue: "",
    passwordInputValue: ""
  };

  componentDidUpdate() {
    if (this.props.userToken) {
      this.props.navigation.navigate("Main");
    }
  }

  onLoginPress = () => {
    const authData = {
      phone: `+${this.state.phoneInputValue}`,
      password: this.state.passwordInputValue
    };
    this.props.onLogin(authData);
  };

  onPhoneChange = phone => {
    this.setState({
      phoneInputValue: phone
    });
  };

  onPasswordChange = password => {
    this.setState({
      passwordInputValue: password
    });
  };

  onMainPress = () => this.props.navigation.goBack();

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.screenTitle}>Вхід</Text>
          <View style={styles.inputsContainer}>
            <Input
              autoCorrect={false}
              value={this.state.phoneInputValue}
              placeholder="380000000000"
              label="Номер телефону"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onPhoneChange}
              textContentType="telephoneNumber"
              keyboardType="numeric"
            />
            <Input
              value={this.state.passwordInputValue}
              placeholder="*********"
              label="Пароль"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onPasswordChange}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Увійти"
            onPress={this.onLoginPress}
            loading={isLoading}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userId: state.auth.userId,
    userToken: state.auth.userToken,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
