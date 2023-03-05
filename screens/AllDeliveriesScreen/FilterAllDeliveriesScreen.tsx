import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import CheckBoxItem from "../../components/CheckBoxItem";
import { Colors } from "../../constants";
import { downloadAllOrders } from "../../store/actions";
import { DownloadOrderData } from "../../store/actions/orders";
import { ThunkDispatch } from "redux-thunk";
type SizesArray = Record<number, { id: number; title: string }>;
type WeightsArray = Record<number, { id: number; title: string }>;

type Props = {
  navigation: NavigationProp<any, any>;
  downloadAllOrders: (orderData: DownloadOrderData) => void;
};

type State = {
  selectedSizes: string[];
  selectedWeights: string[];
};

class FilterAllDeliveriesScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Фільтр доставок",
  };

  static sizesArray: SizesArray = {
    1: { id: 1, title: "Пакет" },
    2: { id: 2, title: "Рюкзак" },
    3: { id: 3, title: "Легкове авто" },
    4: { id: 4, title: "Вантажне авто" },
  };

  static weightsArray: WeightsArray = {
    1: { id: 1, title: "До 1" },
    2: { id: 2, title: "До 5" },
    3: { id: 3, title: "До 10" },
    4: { id: 4, title: "До 30" },
    5: { id: 4, title: "Понад 30" },
  };

  state: State = {
    selectedSizes: [],
    selectedWeights: [],
  };

  onSizePress = (value: string) => {
    const { selectedSizes } = this.state;
    if (selectedSizes.includes(value)) {
      const filteredSelectedSizes = selectedSizes.filter(
        (title) => title !== value
      );
      this.setState({
        selectedSizes: filteredSelectedSizes,
      });
    } else {
      this.setState({
        selectedSizes: [...selectedSizes, value],
      });
    }
  };

  onWeightPress = (value: string) => {
    const { selectedWeights } = this.state;
    if (selectedWeights.includes(value)) {
      const filteredSelectedWeights = selectedWeights.filter(
        (title) => title !== value
      );
      this.setState({
        selectedWeights: filteredSelectedWeights,
      });
    } else {
      this.setState({
        selectedWeights: [...selectedWeights, value],
      });
    }
  };

  onFilterApplyPress = () => {
    const { selectedWeights, selectedSizes } = this.state;
    this.props.downloadAllOrders({
      packageWeight: selectedWeights,
      packageSize: selectedSizes,
    });
    this.props.navigation.goBack();
  };

  render() {
    const weightsArray = FilterAllDeliveriesScreen.weightsArray;
    const sizesArray = FilterAllDeliveriesScreen.sizesArray;
    const { selectedWeights, selectedSizes } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerText}>Орієнтована вага:</Text>
          {Object.entries(weightsArray).map(([id, { title }]): JSX.Element => {
            return (
              <CheckBoxItem
                key={id}
                title={title}
                checked={selectedWeights.includes(title)}
                onPress={this.onWeightPress}
              />
            );
          })}
          <Text style={[styles.headerText, styles.sizeFilterSection]}>
            Має поміститися у:
          </Text>
          {Object.entries(sizesArray).map(([id, { title }]): JSX.Element => {
            return (
              <CheckBoxItem
                key={id}
                title={title}
                checked={selectedSizes.includes(title)}
                onPress={this.onSizePress}
              />
            );
          })}
          <Button
            style={styles.applyButton}
            title="Застосувати фільтр"
            onPress={this.onFilterApplyPress}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    downloadAllOrders: (filterOptions: DownloadOrderData) =>
      dispatch(downloadAllOrders(filterOptions)),
  };
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  headerText: {
    color: Colors.mainTextColor,
    fontSize: 17,
  },
  sizeFilterSection: {
    marginTop: 10,
  },
  applyButton: {
    marginTop: 14,
  },
});

export default connect(null, mapDispatchToProps)(FilterAllDeliveriesScreen);
