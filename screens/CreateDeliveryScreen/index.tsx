import React from "react";
import { View, ScrollView } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import SectionHeader from "../../components/SectionHeader";
import ListItemRow from "../../components/ListItemRow";
import ListItemHorizontal from "../../components/ListItemHorizontal";

import { createOrder } from "../../store/actions";

import styles from "./styles";

// TODO: Add typesctipt 
class CreateDeliveryScreen extends React.Component {
  static navigationOptions = {
    title: "Додати замовлення",
  };

  state = {
    startAdress: "",
    destinationAdress: "",
    proposedPrice: "",
    image: "",
    selectedWeightId: null,
    selectedSizeId: null,
  };

  static getWeightIcons(title) {
    switch (title) {
      case "Пакет":
        return "basket";
      case "Рюкзак":
        return "briefcase";
      case "Легкове авто":
        return "car";
      case "Вантажне авто":
        return "bus";
      default:
        return "question";
    }
  }

  static sizesArray = {
    1: { id: 1, title: "Пакет" },
    2: { id: 2, title: "Рюкзак" },
    3: { id: 3, title: "Легкове авто" },
    4: { id: 4, title: "Вантажне авто" },
  };

  static weightsArray = {
    1: { id: 1, title: "До 1" },
    2: { id: 2, title: "До 5" },
    3: { id: 3, title: "До 10" },
    4: { id: 4, title: "До 30" },
    5: { id: 4, title: "Понад 30" },
  };

  onStartAdressPress = () => {
    this.props.navigation.navigate("InputData", {
      onPress: this.onStartAdressSelected,
      labelTitle: "Введіть початкову адресу",
      screenTitle: "Початкова адреса",
      inputData: this.state.startAdress,
    });
  };

  onEndAdressPress = () => {
    this.props.navigation.navigate("InputData", {
      onPress: this.onDestinationAdressSelected,
      labelTitle: "Введіть кінцеву адресу",
      screenTitle: "Кінцева адреса",
      inputData: this.state.destinationAdress,
    });
  };

  onProposedPricePress = () => {
    this.props.navigation.navigate("InputData", {
      onPress: this.onProposedPriceSelected,
      labelTitle: "Введіть пропоновану вартість доставки",
      screenTitle: "Ціна доставки",
      inputData: this.state.proposedPrice,
    });
  };

  onProposedPriceSelected = (price) => {
    this.setState({
      proposedPrice: price,
    });
  };

  onStartAdressSelected = (address) => {
    this.setState({
      startAdress: address,
    });
  };

  onDestinationAdressSelected = (address) => {
    this.setState({
      destinationAdress: address,
    });
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
      this.setState({ image: result.uri });
    }
  };

  onSavePress = () => {
    const { sizesArray, weightsArray } = CreateDeliveryScreen;
    const { selectedSizeId, selectedWeightId, image } = this.state;
    const orderData = {
      primaryStreet: this.state.startAdress,
      destinationStreet: this.state.destinationAdress,
      primaryCity: "м. Львів",
      destinationCity: "м. Львів",
      packageSize: sizesArray[selectedSizeId].title,
      packageWeight: weightsArray[selectedWeightId].title,
      image,
    };
    this.props.createOrder(orderData);
    this.props.navigation.goBack();
  };

  renderDeliverySizeSelector = () => {
    const { selectedSizeId } = this.state;
    const sizesArray = CreateDeliveryScreen.sizesArray;
    return (
      <>
        <SectionHeader
          title="Має поміститися у:"
          containerStyle={styles.deliverySizeHeader}
        />
        <View style={styles.sizeList}>
          {Object.keys(sizesArray).map((sizeId) => {
            const item = sizesArray[sizeId];
            return (
              <ListItemHorizontal
                id={sizeId}
                key={sizeId}
                image={CreateDeliveryScreen.getWeightIcons(item.title)}
                title={item.title}
                selected={selectedSizeId === sizeId}
                onPress={this.onSizeSelect}
              />
            );
          })}
        </View>
      </>
    );
  };

  onWeightSelect = (id) => {
    this.setState({
      selectedWeightId: id,
    });
  };

  onSizeSelect = (id) => {
    this.setState({
      selectedSizeId: id,
    });
  };

  renderWeight = () => {
    const { selectedWeightId } = this.state;
    const weightsArray = CreateDeliveryScreen.weightsArray;
    return (
      <>
        <SectionHeader
          title="Орієнтована вага, кг:"
          containerStyle={styles.deliveryWeightHeader}
        />
        <View style={styles.sizeList}>
          {Object.keys(weightsArray).map((weightId) => (
            <ListItemHorizontal
              id={weightId}
              key={weightId}
              image={"cube"}
              title={weightsArray[weightId].title}
              selected={selectedWeightId === weightId}
              onPress={this.onWeightSelect}
            />
          ))}
        </View>
      </>
    );
  };

  render() {
    const { ordersList } = this.props;
    const { startAdress, destinationAdress, proposedPrice, image } = this.state;
    const avatarImageProps = image
      ? { source: { uri: image || "" } }
      : { icon: { name: "cube", type: "font-awesome" } };

    return (
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Avatar
            {...avatarImageProps}
            rounded
            showEditButton
            size="large"
            onPress={this._pickImage}
            containerStyle={styles.photo}
          />
        </View>
        <SectionHeader
          title="Деталі відправлення:"
          containerStyle={styles.sectionHeaderStyle}
        />
        <ListItemRow
          title="Звідки"
          subtitle={startAdress || "Додати адресу"}
          onPress={this.onStartAdressPress}
        />
        <ListItemRow
          title="Куди"
          subtitle={destinationAdress || "Додати адресу"}
          onPress={this.onEndAdressPress}
        />
        <ListItemRow
          title="Пропонована вартість"
          subtitle={proposedPrice || "Додати вартість"}
          onPress={this.onProposedPricePress}
        />
        {this.renderDeliverySizeSelector()}
        {this.renderWeight()}
        <View style={styles.buttonContainer}>
          <Button
            title="Додати"
            onPress={this.onSavePress}
            style={styles.button}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data) => dispatch(createOrder(data)),
  };
};

export default connect(null, mapDispatchToProps)(CreateDeliveryScreen);
