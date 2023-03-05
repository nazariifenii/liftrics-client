import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { NavigationProp } from "@react-navigation/native";

import { doSignUp } from "../../store/actions/auth";
import styles from "./styles";
import { ThunkDispatch } from "redux-thunk";

type RegistrationData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
};

type Props = {
  navigation: NavigationProp<any, any>;
  userToken: string;
  isLoading: boolean;
  onRegister: (registrationData: RegistrationData) => void;
};

class RegisterScreen extends React.Component<Props> {
  state = {
    nameInputValue: "",
    surnameInputValue: "",
    phoneInputValue: "",
    passwordInputValue: "",
    repeatPasswordInputValue: "",
  };

  componentDidUpdate() {
    if (this.props.userToken) {
      this.props.navigation.navigate("Main");
    }
  }

  validateInputs = () => {
    return true;
  };

  onRegisterPress = () => {
    if (this.validateInputs()) {
      const registrationData: RegistrationData = {
        firstName: this.state.nameInputValue,
        lastName: this.state.surnameInputValue,
        phoneNumber: `+${this.state.phoneInputValue}`,
        password: this.state.passwordInputValue,
      };
      this.props.onRegister(registrationData);
    }
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

  onRepeatPasswordChange = (repeatPassword: string) => {
    this.setState({
      repeatPasswordInputValue: repeatPassword,
    });
  };

  onNameChange = (name: string) => {
    this.setState({
      nameInputValue: name,
    });
  };

  onSurnameChange = (surname: string) => {
    this.setState({
      surnameInputValue: surname,
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.screenTitle}>Реєстрація</Text>
          <View style={styles.inputsContainer}>
            <Input
              autoCorrect={false}
              value={this.state.nameInputValue}
              placeholder="Петро"
              label="Ім'я"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onNameChange}
              textContentType="name"
            />
            <Input
              autoCorrect={false}
              value={this.state.surnameInputValue}
              placeholder="Петренко"
              label="Прізвище"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onSurnameChange}
              textContentType="familyName"
            />
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
            <Input
              value={this.state.repeatPasswordInputValue}
              placeholder="*********"
              label="Повторіть пароль"
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onRepeatPasswordChange}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Зареєструватися"
            onPress={this.onRegisterPress}
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
    onRegister: (authData: RegistrationData) => dispatch(doSignUp(authData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
