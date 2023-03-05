import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Input, Avatar } from "react-native-elements";
import io from "socket.io-client";
import { Icon } from "expo";
import { Colors } from "../../constants";

import styles from "./styles";

// TODO: Add typesctipt and finish functionality
class ConversationScreen extends React.Component {
  static navigationOptions = {
    title: "Чати"
  };

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("https://liftrics.herokuapp.com/");
    this.socket.on("chat message", message => {
      this.setState({
        chatMessages: [...this.state.chatMessages, message]
      });
    });
  }

  // componentWillUnmount() {
  //   this.socket.emit("unsubscribe", "5cf3b1773f291012e6555f0f");
  // }

  submitChatMessage = () => {
    this.socket.emit("chat message", this.state.chatMessage);
    // this.socket.emit("send", {
    //   room: "5cf3b1773f291012e6555f0f",
    //   message: this.state.chatMessage,
    //   sender: this.props.authUserId
    // });
    this.setState({ chatMessage: "" });
  };

  render() {
    const { chatMessage, chatMessages } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "flex-end" }}
        >
          {chatMessages.map(message => (
            <View style={styles.message}>
              <View style={styles.messageContainer}>
                <Text style={styles.messageText} key={message}>
                  {message}
                </Text>
              </View>
              <Avatar
                rounded
                icon={{ name: "user", type: "font-awesome" }}
                size="small"
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <Input
            placeholder="Введіть своє повідомлення тут..."
            onChangeText={chatMessage => {
              this.setState({
                chatMessage
              });
            }}
            containerStyle={{ flex: 1 }}
            value={chatMessage}
            autoCorrect={false}
            onSubmitEditing={this.submitChatMessage}
          />
          <TouchableOpacity onPress={this.submitChatMessage}>
            <Icon.Ionicons
              name={
                Platform.OS === "ios"
                  ? `ios-arrow-dropup-circle`
                  : "md-arrow-dropup-circle"
              }
              size={33}
              color={Colors.tintColor}
              style={{ marginHorizontal: 16, marginTop: 4 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUserId: state.auth.userId
  };
};

export default ConversationScreen;
