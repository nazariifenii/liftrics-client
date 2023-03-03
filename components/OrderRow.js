import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

const OrderRow = ({
  orderId,
  primaryStreet = "Не вказано",
  destinationStreet = "Не вказано",
  primaryCity = "м. Львів",
  detimationCity = "м. Львів",
  orderSize = "Не вказано",
  creationDate,
  orderWeight,
  navigation
}) => {
  const onRowPress = () => {
    navigation.navigate("DeliveryDetails", {
      orderId
    });
  };

  const Container = navigation ? TouchableOpacity : View;
  return (
    <Container onPress={onRowPress}>
      <>
        <View style={[styles.container]}>
          <View style={styles.addressContainer}>
            <View style={styles.row}>
              <View>
                <View>
                  <View style={styles.streetRow}>
                    <Text style={styles.streetTitle}>{primaryStreet}</Text>
                    <Text style={styles.cityTitle}>{primaryCity}</Text>
                  </View>
                  <Text style={styles.streetTitle}>{destinationStreet}</Text>
                  <Text style={styles.cityTitle}>{detimationCity}</Text>
                </View>
              </View>
              <View>
                <Text style={[styles.streetTitle, styles.textRight]}>
                  Дата створення:
                </Text>
                <Text style={[styles.cityTitle, styles.textRight]}>
                  {creationDate}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.streetTitle}>Поміститься у:</Text>
              <Text style={styles.cityTitle}>{orderSize}</Text>
            </View>
            <View>
              <Text style={[styles.streetTitle, styles.textRight]}>
                Вага відправлення, кг:
              </Text>
              <Text style={[styles.cityTitle, styles.textRight]}>
                {orderWeight}
              </Text>
            </View>
          </View>
        </View>
        <ListItemSeparator />
      </>
    </Container>
  );
};

export default OrderRow;

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  streetRow: {
    flexDirection: "column",
    marginBottom: 10
  },
  streetTitle: {
    fontSize: 15,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  },
  cityTitle: {
    marginTop: -4,
    fontSize: 12,
    fontFamily: Fonts.avenir,
    color: Colors.disabledTextColour
  },
  addressContainer: {
    marginBottom: 17
  },
  textRight: {
    textAlign: "right"
  },
  verticalLine: {
    borderLeftWidth: 2,
    borderLeftColor: "black"
  }
});
