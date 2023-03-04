import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import CheckBoxItem from "../../components/CheckBoxItem";
import { Colors, Fonts } from "../../constants";
import { Button } from "react-native-elements";
import { downloadAllOrders } from "../../store/actions";

class FilterAllDeliveriesScreen extends React.Component {
  static navigationOptions = {
    title: "Фільтр доставок"
  };

  static sizesArray = {
    1: { id: 1, title: "Пакет" },
    2: { id: 2, title: "Рюкзак" },
    3: { id: 3, title: "Легкове авто" },
    4: { id: 4, title: "Вантажне авто" }
  };

  static weightsArray = {
    1: { id: 1, title: "До 1" },
    2: { id: 2, title: "До 5" },
    3: { id: 3, title: "До 10" },
    4: { id: 4, title: "До 30" },
    5: { id: 4, title: "Понад 30" }
  };

  state = {
    selectedSizes: [],
    selectedWeights: []
  };

  onSizePress = value => {
    const { selectedSizes } = this.state;
    if (selectedSizes.includes(value)) {
      const filteredSelectedSizes = selectedSizes.filter(
        title => title !== value
      );
      this.setState({
        selectedSizes: filteredSelectedSizes
      });
    } else {
      this.setState({
        selectedSizes: [...selectedSizes, value]
      });
    }
  };

  onWeightPress = value => {
    const { selectedWeights } = this.state;
    if (selectedWeights.includes(value)) {
      const filteredSelectedWeights = selectedWeights.filter(
        title => title !== value
      );
      this.setState({
        selectedWeights: filteredSelectedWeights
      });
    } else {
      this.setState({
        selectedWeights: [...selectedWeights, value]
      });
    }
  };

  onFilterApplyPress = () => {
    const { selectedWeights, selectedSizes } = this.state;
    this.props.downloadAllOrders({
      packageWeight: selectedWeights,
      packageSize: selectedSizes
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
          {Object.keys(weightsArray).map(id => {
            const title = weightsArray[id].title;
            return (
              <CheckBoxItem
                key={title}
                title={title}
                checked={selectedWeights.includes(title)}
                onPress={this.onWeightPress}
              />
            );
          })}
          <Text style={[styles.headerText, styles.sizeFilterSection]}>
            Має поміститися у:
          </Text>
          {Object.keys(sizesArray).map(id => {
            const title = sizesArray[id].title;
            return (
              <CheckBoxItem
                key={title}
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

const mapStateToProps = state => {
  return {
    // userToken: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    downloadAllOrders: filterOptions =>
      dispatch(downloadAllOrders(filterOptions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterAllDeliveriesScreen);

const styles = StyleSheet.create({
  container: {
    margin: 16
  },
  headerText: {
    color: Colors.mainTextColor,
    fontSize: 17
  },
  sizeFilterSection: {
    marginTop: 10
  },
  applyButton: {
    marginTop: 14
  }
});
