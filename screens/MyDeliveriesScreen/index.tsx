import React from "react";
import { Text } from "react-native";
import DriverTabScreen from "./DriverTabScreen";

import TabView from "../../components/TabView";
import { connect } from "react-redux";
import { getMyOrdersByKey } from "../../store/actions";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getMyOrdersByKey: key => dispatch(getMyOrdersByKey(key))
  };
};

class MyDeliveries extends React.Component<Props, void> {
  static navigationOptions = {
    title: "Мої доставки"
  };

  componentWillMount() {
    this.props.getMyOrdersByKey("driver");
    this.props.getMyOrdersByKey("creator");
  }

  render() {
    return (
      <TabView
        titles={["Водія", "Замовника"]}
        screens={[
          <DriverTabScreen
            key="driver"
            pageKey="driver"
            navigation={this.props.navigation}
          />,
          <DriverTabScreen
            key="creator"
            pageKey="creator"
            navigation={this.props.navigation}
          />
        ]}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDeliveries);
