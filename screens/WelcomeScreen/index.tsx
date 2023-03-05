import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Image, Button } from "react-native-elements";
import styles from "./styles";
import { NavigationProp } from "@react-navigation/native";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { authAutoSignIn } from "../../store/actions";

type Props = {
  navigation: NavigationProp<any, any>;
  onAutoSignIn: (navigation: NavigationProp<any, any>) => void;
};

class WelcomeScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    headerBackTitle: "Назад",
  };

  componentDidMount() {
    this.props.onAutoSignIn(this.props.navigation);
  }

  onLoginPress = () => {
    this.props.navigation.navigate("SignIn");
  };

  onRegisterPress = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageTitleContainer}>
          <Text style={styles.screenTitle}>LIFTRICS</Text>
          <Image
            source={{ uri: deliveryImagePath }}
            style={styles.imageStyle}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.descriptionText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum is
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Увійти"
            buttonStyle={styles.button}
            onPress={this.onLoginPress}
          />
          <Button
            title="Зареєструватися"
            buttonStyle={styles.button}
            onPress={this.onRegisterPress}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    onAutoSignIn: (navigation: NavigationProp<any, any>) =>
      dispatch(authAutoSignIn(navigation)),
  };
};

export default connect(null, mapDispatchToProps)(WelcomeScreen);

const deliveryImagePath =
  "https://cdn.dribbble.com/users/1023685/screenshots/2637190/delivery_icon.jpg";
