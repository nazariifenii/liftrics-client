import React from "react";
import { Text, ActivityIndicator, VirtualizedList } from "react-native";
import { connect } from "react-redux";

import OrderRow from "../../components/OrderRow";

const mapStateToProps = (state, ownProps) => {
  return {
    ordersIds: state.order.myOrdersIdsByKey[ownProps.pageKey] || [],
    ordersData: state.order.ordersDataById || {}
  };
};

class DriverTabScreen extends React.Component<Props, void> {
  static navigationOptions = {
    title: "Мої доставки"
  };

  getListItemCount = (): number => {
    if (this.props.ordersIds.length > 0) {
      return this.props.ordersIds.length;
    }
    return 0;
  };

  listItemKeyExtractor = (item: Object) => item._id;

  renderItem = ({ item }: { item: Object }) => (
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

  getListItem = (data: string[], index: number): Object => {
    if (index < data.length) {
      const id = data[index];
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
        // ListEmptyComponent={ActivityIndicator}
        // ItemSeparatorComponent={ListItemSeparator}
        // onEndReached={this.onListEndReached}
        // onEndReachedThreshold={0.25}
        // onRefresh={this.onListRefresh}
        // refreshing={refreshingAfterPull}
      />
    );
  }
}

export default connect(mapStateToProps)(DriverTabScreen);
