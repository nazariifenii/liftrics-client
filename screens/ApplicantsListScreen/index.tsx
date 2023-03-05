import React from "react";
import { VirtualizedList, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import { submitDriver } from "../../store/actions";

import ApplicantRow from "../../components/ApplicantRow";
import { NavigationProp } from "@react-navigation/native";
import { ThunkDispatch } from "redux-thunk";

type Applicant = {
  _id: string;
  firstName: string;
  imageUrl: string;
  userTotalRating: number;
};

type Props = {
  navigation: NavigationProp<any, any>;
  submitDriver: (orderId: string, userId: string) => void;
  userList: Record<number, Applicant>;
  route: any;
};

type State = {};

class ApplicantsListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "Список заявок",
    headerBackTitle: "Назад",
  };

  onSubmitApplicantPress = (userId: string) => {
    const { orderId } = this.props.route.params;
    if (orderId && userId) {
      this.props.submitDriver(orderId, userId);
      this.props.navigation.goBack();
    }
  };

  renderItem = ({ item }: { item: Applicant }) => (
    <ApplicantRow
      key={item._id}
      userId={item._id}
      userName={item.firstName}
      imageUrl={item.imageUrl}
      userRating={item.userTotalRating}
      onPress={this.onSubmitApplicantPress}
    />
  );

  listItemKeyExtractor = (item: Applicant) => item._id;

  getListItemCount = (): number => {
    const { applicantsIds } = this.props.route.params;
    if (applicantsIds.length > 0) {
      return applicantsIds.length;
    }
    return 0;
  };

  getListItem = (data: number[], index: number): Object => {
    if (index < data.length) {
      const id: number = data[index];
      return this.props.userList[id];
    }
    return { listItemType: "activity-indicator", id: "activity-indicator" };
  };

  render() {
    const { applicantsIds } = this.props.route.params;
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
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList || {},
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    submitDriver: (orderId: string, driverId: string) =>
      dispatch(submitDriver(orderId, driverId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantsListScreen);
