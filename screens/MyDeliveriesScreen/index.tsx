import React from "react";
import DriverTabScreen from "./DriverTabScreen";
import { NavigationProp } from "@react-navigation/native";
import TabView from "../../components/TabView";
import { connect } from "react-redux";
import { getMyOrdersByKey } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";

type Key = "driver" | "creator";

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    getMyOrdersByKey: (key: Key) => dispatch(getMyOrdersByKey(key)),
  };
};

type Props = {
  getMyOrdersByKey: (key: Key) => void;
  navigation: NavigationProp<any, any>;
};

class MyDeliveries extends React.Component<Props> {
  static navigationOptions = {
    title: "Мої доставки",
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
          />,
        ]}
      />
    );
  }
}
export default connect(null, mapDispatchToProps)(MyDeliveries);
