import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Rating } from "react-native-elements";

import { Colors, Fonts } from "../../constants";

const UserProfileHeader = ({
  lastName = "",
  firstName = "",
  rating = 0,
  imageUrl,
  onImageEditPress
}) => {
  const avatarImageProps = imageUrl
    ? { source: { uri: imageUrl } }
    : { icon: { name: "user", type: "font-awesome" } };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        {...avatarImageProps}
        showEditButton
        size="large"
        onPress={onImageEditPress}
      />
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.lastNameTitle}>{lastName}</Text>
          <Text style={styles.firstNameTitle}>{firstName}</Text>
        </View>
        <View style={styles.raitingContainer}>
          <Rating imageSize={15} readonly startingValue={rating} />
          <Text style={styles.ratingTitle}>
            {rating ? `${rating} / 5` : "Немає рейтингу"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 16
  },
  raitingContainer: {
    flexDirection: "row",
    alignContent: "center"
  },
  titleContainer: {
    justifyContent: "space-between",
    marginLeft: 15
  },
  lastNameTitle: {
    fontSize: 21,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  },
  firstNameTitle: {
    fontSize: 18,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  },
  ratingTitle: {
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginLeft: 5,
    fontSize: 13
  }
});

export default UserProfileHeader;
