import React from "react";
import R from "ramda";
import { ImagePicker, Permissions } from "expo";
import { Button } from "react-native-elements";
import {
  Text,
  View,
  ScrollView,
  Linking,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import UserProfileHeader from "./UserProfileHeader";
import SectionHeader from "../../components/SectionHeader";
import ListItemRow from "../../components/ListItemRow";

import styles from "./styles";
import {
  logout,
  downloadContactById,
  saveUserImage
} from "../../store/actions";

const mapStateToProps = state => {
  const userId = state.auth.userId;
  return {
    userId,
    userToken: state.auth.userToken || "",
    contactData: (userId && state.users.userList[userId]) || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    downloadContactById: contactId => dispatch(downloadContactById(contactId)),
    saveUserImage: imageUri => dispatch(saveUserImage(imageUri))
  };
};

class UserProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Профіль користувача"
  };

  state = {
    image: null
  };

  componentDidMount() {
    this.props.downloadContactById(this.props.userId);
  }

  componentDidUpdate() {
    const { userToken, userId } = this.props;
    if (!userToken || !userId) {
      this.props.navigation.navigate("Welcome");
    }
  }

  onOpenUrl = url => {
    if (url && Linking.canOpenURL(url)) {
      Linking.openURL(url);
    }
  };

  renderMainInformationSection = (contactData: Object) => {
    return (
      <View>
        <SectionHeader
          title="Особисті деталі:"
          containerStyle={styles.sectionHeaderStyle}
        />
        <ListItemRow
          title="Основна інформація"
          subtitle="Ім’я, Дата народження"
          onPress={() => console.log("HELLO")}
        />
        <ListItemRow
          title="Номер телефону"
          subtitle={contactData.phoneNumber}
          onPress={() => this.onOpenUrl(contactData.phoneNumber)}
        />
        <ListItemRow
          title="Електронна пошта"
          subtitle={contactData.email || "Вказати електронну адресу"}
          onPress={() => this.onOpenUrl(contactData.email)}
        />
        <ListItemRow
          title="Пароль"
          subtitle="********"
          onPress={() => console.log("HELLO")}
        />
      </View>
    );
  };

  renderDeliveryInfo = () => {
    return (
      <View>
        <SectionHeader
          title="Деталі доставки:"
          containerStyle={styles.sectionHeaderStyle}
        />
        <ListItemRow title="Спосіб оплати" subtitle="Готівка" />
        <ListItemRow
          title="Транспортний засіб"
          subtitle="Mercedes Vito, ВС3252ЕВ"
          onPress={() => console.log("HELLO")}
        />
      </View>
    );
  };

  onLogoutPress = () => {
    this.props.logout();
  };

  _pickImage = async () => {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        this.openImageLibrary();
      }
    } else {
      this.openImageLibrary();
    }
  };

  openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.props.saveUserImage(result.uri);
      this.setState({ image: result.uri });
    }
  };

  renderEmptyScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    let { image } = this.state;
    const { contactData } = this.props;
    if (!R.isEmpty(contactData)) {
      this.renderEmptyScreen();
    }
    return (
      <ScrollView>
        <UserProfileHeader
          imageUrl={contactData.imageUrl}
          lastName={contactData.firstName}
          firstName={contactData.lastName}
          rating={Number(contactData.userTotalRating)}
          onImageEditPress={this._pickImage}
        />
        {this.renderMainInformationSection(contactData)}
        {this.renderDeliveryInfo()}
        <Button
          title="Вийти з акаунта"
          onPress={this.onLogoutPress}
          style={styles.button}
        />
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen);
