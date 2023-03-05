import React from "react";
import R from "ramda";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-elements";
import { View, ScrollView, Linking, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { NavigationProp } from "@react-navigation/native";

import UserProfileHeader from "./UserProfileHeader";
import SectionHeader from "../../components/SectionHeader";
import ListItemRow from "../../components/ListItemRow";

import styles from "./styles";
import {
  logout,
  downloadContactById,
  saveUserImage,
} from "../../store/actions";

const mapStateToProps = (state) => {
  const userId = state.auth.userId;
  return {
    userId,
    userToken: state.auth.userToken || "",
    contactData: (userId && state.users.userList[userId]) || {},
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    logout: () => dispatch(logout()),
    downloadContactById: (contactId: string) =>
      dispatch(downloadContactById(contactId)),
    saveUserImage: (imageUri: string) => dispatch(saveUserImage(imageUri)),
  };
};

type Contact = {
  phoneNumber: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  userTotalRating: number;
};

type Props = {
  userId: string;
  userToken: string;
  navigation: NavigationProp<any, any>;
  contactData: Contact;
  downloadContactById: (userId: string) => void;
  logout: () => void;
  saveUserImage: (uri: string) => void;
};

class UserProfileScreen extends React.Component<Props> {
  static navigationOptions = {
    title: "Профіль користувача",
  };

  state = {
    image: null,
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

  onOpenUrl = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  renderMainInformationSection = (contactData: Contact) => {
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
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (newStatus === "granted") {
        this.openImageLibrary();
      }
    } else {
      this.openImageLibrary();
    }
  };

  openImageLibrary = async () => {
    const result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
