import React from "react";
import R from "ramda";
import {
  StyleSheet,
  VirtualizedList,
  ScrollView,
  View,
  Text,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { submitDriver } from "../../store/actions";

import ApplicantRow from "../../components/ApplicantRow";
import styles from "./styles";

class ApplicantsListScreen extends React.Component {
  static navigationOptions = {
    title: "Список заявок",
    headerBackTitle: "Назад"
  };

  onSubmitApplicantPress = userId => {
    const { orderId } = this.props.navigation.state.params;
    if (orderId && userId) {
      this.props.submitDriver(orderId, userId);
      this.props.navigation.goBack();
    }
  };

  renderItem = ({ item }: { item: Object }) => (
    <ApplicantRow
      key={item._id}
      userId={item._id}
      userName={item.firstName}
      imageUrl={item.imageUrl}
      userRating={item.userTotalRating}
      onPress={this.onSubmitApplicantPress}
    />
  );

  listItemKeyExtractor = (item: Object) => item._id;

  getListItemCount = (): number => {
    const { applicantsIds } = this.props.navigation.state.params;
    if (applicantsIds.length > 0) {
      return applicantsIds.length;
    }
    return 0;
  };

  getListItem = (data: string[], index: number): Object => {
    if (index < data.length) {
      const id = data[index];
      return this.props.userList[id];
    }
    return { listItemType: "activity-indicator", id: "activity-indicator" };
  };

  render() {
    const { applicantsIds } = this.props.navigation.state.params;
    const { userList } = this.props;

    return (
      <VirtualizedList
        data={applicantsIds}
        extraData={userList}
        getItemCount={this.getListItemCount}
        getItem={this.getListItem}
        renderItem={this.renderItem}
        keyExtractor={this.listItemKeyExtractor}
        ListEmptyComponent={ActivityIndicator}
        // ItemSeparatorComponent={ListItemSeparator}
        // onEndReached={this.onListEndReached}
        // onEndReachedThreshold={0.25}
        // onRefresh={this.onListRefresh}
        // refreshing={refreshingAfterPull}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userList: state.users.userList || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitDriver: (orderId, driverId) =>
      dispatch(submitDriver(orderId, driverId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantsListScreen);
