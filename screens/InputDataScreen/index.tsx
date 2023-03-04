import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";

import styles from "./styles";

class InputDataScreen extends React.Component {
  state = {
    inputValue: this.props.navigation.state.params.inputData
  };

  static navigationOptions = {
    headerBackTitle: "Назад"
  };

  onSubmitPress = () => {
    if (this.state.inputValue) {
      this.props.navigation.state.params.onPress(this.state.inputValue);
    }
    this.props.navigation.goBack();
  };

  onInputValueChange = data => {
    this.setState({
      inputValue: data
    });
  };

  render() {
    const { labelTitle, screenTitle } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.screenTitle}>{screenTitle}</Text>
          <View style={styles.inputsContainer}>
            <Input
              autoCorrect={false}
              value={this.state.inputValue}
              label={labelTitle}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={styles.containerStyle}
              onChangeText={this.onInputValueChange}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Зберегти"
            onPress={this.onSubmitPress}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

export default InputDataScreen;
