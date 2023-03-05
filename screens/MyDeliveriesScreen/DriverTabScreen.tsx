import React from "react";
import { VirtualizedList } from "react-native";
import { connect } from "react-redux";
import { NavigationProp } from "@react-navigation/native";

import OrderRow from "../../components/OrderRow";

const mapStateToProps = (state, ownProps) => {
  return {
    ordersIds: state.order.myOrdersIdsByKey[ownProps.pageKey] || [],
    ordersData: state.order.ordersDataById || {},
  };
};

type Order = {
  _id: string;
  primaryStreet: string;
  destinationStreet: string;
  orderSize: string;
  creationDate: string;
  orderWeight: number;
  navigation: NavigationProp<any, any>;
  createdAt: string;
  packageWeight: number;
  packageSize: string;
};

type Props = {
  ordersIds: string[];
  navigation: NavigationProp<any, any>;
  ordersData: Array<Order>;
};

class DriverTabScreen extends React.Component<Props> {
  static navigationOptions = {
    title: "Мої доставки",
  };

  getListItemCount = (): number => {
    if (this.props.ordersIds.length > 0) {
      return this.props.ordersIds.length;
    }
    return 0;
  };

  listItemKeyExtractor = (item: Order) => item._id;

  renderItem = ({ item }: { item: Order }) => (
    <OrderRow
      key={item._id}
      orderId={item._id}
      primaryStreet={item.primaryStreet}
      destinationStreet={item.destinationStreet}
      navigation={this.props.navigation}
      creationDate={item.createdAt}
      orderWeight={item.packageWeight}
      orderSize={item.packageSize}
    />
  );

  getListItem = (data: number[], index: number): Object => {
    if (index < data.length) {
      const id: number = data[index];
      return this.props.ordersData[id];
    }
    return { listItemType: "activity-indicator", id: "activity-indicator" };
  };

  render() {
    const { ordersIds, ordersData } = this.props;
    return (
      <VirtualizedList
        data={ordersIds}
        extraData={ordersData}
        getItemCount={this.getListItemCount}
        getItem={this.getListItem}
        renderItem={this.renderItem}
        keyExtractor={this.listItemKeyExtractor}
      />
    );
  }
}

export default connect(mapStateToProps)(DriverTabScreen);
