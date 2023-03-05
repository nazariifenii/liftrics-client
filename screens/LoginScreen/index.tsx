import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationProp } from "@react-navigation/native";
import { ThunkDispatch } from "redux-thunk";

import { tryAuth } from "../../store/actions";
import styles from "./styles";

type Auth = {
  phone: string;
  password: string;
};

type Props = {
  userToken: string;
  navigation: NavigationProp<any, never, any>;
  isLoading: boolean;
  onLogin: (authData: Auth) => void;
};

class LoginScreen extends React.Component<Props> {
  state = {
    phoneInputValue: "",
    passwordInputValue: "",
  };

  componentDidUpdate() {
    if (this.props.userToken) {
      this.props.navigation.navigate("Main");
    }
  }

  onLoginPress = () => {
    const authData = {
      phone: `+${this.state.phoneInputValue}`,
      password: this.state.passwordInputValue,
    };
    this.props.onLogin(authData);
  };

  onPhoneChange = (phone: string) => {
    this.setState({
      phoneInputValue: phone,
    });
  };

  onPasswordChange = (password: string) => {
    this.setState({
      passwordInputValue: password,
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

const mapStateToProps = (state) => {
  return {
    userToken: state.auth.userToken,
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    onLogin: (authData: Auth) => dispatch(tryAuth(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
