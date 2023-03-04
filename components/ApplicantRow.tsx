import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Avatar, Rating, Button } from "react-native-elements";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

type Props = {
  userId: string;
  userName: string;
  imageUrl: string;
  userRating: number;
  onPress?: (userId: string) => void;
};

const ApplicantRow: React.FC<Props> = ({
  userId,
  userName,
  imageUrl,
  userRating = 0,
  onPress,
}) => {
  const onSubmitPress = () => {
    onPress && onPress(userId);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainRow}>
          <View style={styles.row}>
            <Avatar
              rounded
              source={{
                uri: imageUrl,
              }}
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

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  nameText: {
    fontSize: 19,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
  },
  raitingContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  ratingTitle: {
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginLeft: 5,
    fontSize: 13,
  },
  nameRatingContainer: {
    justifyContent: "space-between",
    marginLeft: 5,
  },
  buttonTitleStyle: { fontSize: 12 },
  submitButton: {
    height: 35,
    width: 90,
  },
});

export default ApplicantRow;
