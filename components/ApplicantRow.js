import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Avatar, Rating, Button } from "react-native-elements";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

const ApplicantRow = ({
  userId,
  userName,
  imageUrl,
  userRating = 0,
  navigation,
  onPress
}) => {
  const onSubmitPress = () => {
    onPress(userId);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainRow}>
          <View style={styles.row}>
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
            <View style={styles.nameRatingContainer}>
              <Text style={styles.nameText}>{userName}</Text>
              <View style={styles.raitingContainer}>
                <Rating imageSize={15} readonly startingValue={userRating} />
                <Text style={styles.ratingTitle}>
                  {userRating ? `${userRating} / 5` : ""}
                </Text>
              </View>
            </View>
          </View>
          {onPress && (
            <Button
              title={"Підтвердити"}
              buttonStyle={styles.submitButton}
              titleStyle={styles.buttonTitleStyle}
              onPress={onSubmitPress}
            />
          )}
        </View>
      </View>
      <ListItemSeparator />
    </>
  );
};

export default ApplicantRow;

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  row: {
    flexDirection: "row"
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
    justifyContent: "space-between",
    marginLeft: 5
  },
  buttonTitleStyle: { fontSize: 12 },
  submitButton: {
    height: 35,
    width: 90
  }
});
