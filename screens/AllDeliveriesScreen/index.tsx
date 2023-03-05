import React from "react";
import {
  VirtualizedList,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { NavigationProp } from "@react-navigation/native";

import AddHeaderButton from "../../components/AddHeaderButton";
import FilterHeaderButton from "../../components/FilterHeaderButton";
import ListItemSeparator from "../../components/ListItemSeparator";
import OrderRow from "../../components/OrderRow";

import styles from "./styles";
import { downloadAllOrders, downloadAllUsers } from "../../store/actions";
import { ThunkDispatch } from "redux-thunk";

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
  downloadAllOrders: () => void;
  downloadAllUsers: () => void;
  ordersDataById: Array<Order>;
  useFilter: boolean;
  ordersIds: string[];
  navigation: NavigationProp<any, any>;
};

type State = { refreshingAfterPull: boolean };

class AllDeliveries extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationProp<any, any>;
  }) => ({
    title: "Список доставок",
    headerBackTitle: "Назад",
    headerRight: (
      <AddHeaderButton onPress={() => navigation.navigate("CreateDelivery")} />
    ),
    headerLeft: (
      <FilterHeaderButton
        onPress={() => navigation.navigate("FilterAllDeliveries")}
      />
    ),
  });

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return prevState.refreshingAfterPull
      ? Object.assign({}, { refreshingAfterPull: false })
      : {};
  }

  state = {
    refreshingAfterPull: false,
  };

  componentDidMount() {
    this.props.downloadAllOrders();
    this.props.downloadAllUsers();
  }

  renderItem = ({ item }: {item: Order}) => (
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

  listItemKeyExtractor = (item: Order) => item._id;

  getListItemCount = (): number => {
    if (this.props.ordersIds.length > 0) {
      return this.props.ordersIds.length;
    }
    return 0;
  };

  getListItem = (data: Array<number>, index: number) => {
    if (index < data.length) {
      const id: number = data[index];
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

const mapStateToProps = (state) => {
  return {
    ordersIds: state.order.ordersIds || [],
    ordersDataById: state.order.ordersDataById || {},
    useFilter: state.order.filter.useFilter || false,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    downloadAllOrders: () => dispatch(downloadAllOrders()),
    downloadAllUsers: () => dispatch(downloadAllUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDeliveries);
