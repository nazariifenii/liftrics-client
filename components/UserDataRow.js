import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Rating } from "react-native-elements";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

const UserDataRow = ({ userName, imageUrl, userRating = 0, navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.nameRatingContainer}>
            <Text style={styles.nameText}>{userName}</Text>
            <View style={styles.raitingContainer}>
              <Rating imageSize={15} readonly startingValue={userRating} />
              <Text style={styles.ratingTitle}>
                {userRating ? `${userRating} / 5` : "Немає рейтингу"}
              </Text>
            </View>
          </View>
          <Avatar
            rounded
            source={
              imageUrl
                ? {
                    uri: imageUrl
                  }
                : { name: "user", type: "font-awesome" }
            }
            size="medium"
          />
        </View>
      </View>
      <ListItemSeparator />
    </>
  );
};

export default UserDataRow;

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  nameText: {
    fontSize: 19,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  },
  raitingContainer: {
    flexDirection: "row",
    alignContent: "center"
  },
  ratingTitle: {
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginLeft: 5,
    fontSize: 13
  },
  nameRatingContainer: {
    justifyContent: "space-between"
  }
});
