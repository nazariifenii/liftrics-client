import React from "react";
import R from "ramda";
import {
  StyleSheet,
  VirtualizedList,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

import AddHeaderButton from "../../components/AddHeaderButton";
import FilterHeaderButton from "../../components/FilterHeaderButton";
import ListItemSeparator from "../../components/ListItemSeparator";
import OrderRow from "../../components/OrderRow";

import styles from "./styles";
import { downloadAllOrders, downloadAllUsers } from "../../store/actions";

class AllDeliveries extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Список доставок",
    headerBackTitle: "Назад",
    headerRight: (
      <AddHeaderButton onPress={() => navigation.navigate("CreateDelivery")} />
    ),
    headerLeft: (
      <FilterHeaderButton
        onPress={() => navigation.navigate("FilterAllDeliveries")}
      />
    )
  });

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let state = {};
    if (prevState.refreshingAfterPull) {
      state = R.merge({ refreshingAfterPull: false }, state);
    }
    return state;
  }

  state = {
    refreshingAfterPull: false
  };

  componentDidMount() {
    this.props.downloadAllOrders();
    this.props.downloadAllUsers();
  }

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

  listItemKeyExtractor = (item: Object) => item._id;

  getListItemCount = (): number => {
    if (this.props.ordersIds.length > 0) {
      return this.props.ordersIds.length;
    }
    return 0;
  };

  getListItem = (data: string[], index: number): Object => {
    if (index < data.length) {
      const id = data[index];
      return this.props.ordersDataById[id];
    }
    return { listItemType: "activity-indicator", id: "activity-indicator" };
  };

  onClearFilterPress = () => {
    this.props.downloadAllOrders();
  };

  onListRefresh = () => {
    if (!this.state.refreshingAfterPull) {
      this.setState({ refreshingAfterPull: true });
      this.props.downloadAllOrders();
    }
  };

  render() {
    const { ordersDataById, ordersIds, useFilter } = this.props;
    const { refreshingAfterPull } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {useFilter && (
          <>
            <View style={styles.clearFilterContainer}>
              <Text style={styles.clearFilterText}>Застосовано фільтр</Text>
              <TouchableOpacity onPress={this.onClearFilterPress}>
                <Text
                  style={[styles.clearFilterText, styles.clearFilterTextLink]}
                >
                  Очистити
                </Text>
              </TouchableOpacity>
            </View>
            <ListItemSeparator />
          </>
        )}
        <VirtualizedList
          data={ordersIds}
          extraData={ordersDataById}
          getItemCount={this.getListItemCount}
          getItem={this.getListItem}
          renderItem={this.renderItem}
          keyExtractor={this.listItemKeyExtractor}
          ListEmptyComponent={ActivityIndicator}
          onEndReachedThreshold={0.25}
          onRefresh={this.onListRefresh}
          refreshing={refreshingAfterPull}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    ordersIds: state.order.ordersIds || [],
    ordersDataById: state.order.ordersDataById || {},
    useFilter: state.order.filter.useFilter || false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    downloadAllOrders: () => dispatch(downloadAllOrders()),
    downloadAllUsers: () => dispatch(downloadAllUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllDeliveries);
