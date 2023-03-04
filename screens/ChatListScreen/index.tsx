import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Input, Avatar } from "react-native-elements";
import io from "socket.io-client";
import { Icon } from "expo";
import { Colors } from "../../constants";
import { connect } from "react-redux";
import ChatRow from "../../components/ChatRow";
import styles from "./styles";

class ChatListScreen extends React.Component {
  static navigationOptions = {
    title: "Оберіть користувача"
  };

  goToChatWith = userId => {
    this.props.navigation.navigate("ConversationPage", {
      userId
    });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.goToChatWith}>
          <ChatRow userName="Nazarii Fenii" />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUserId: state.auth.userId
  };
};

export default connect(mapStateToProps)(ChatListScreen);
