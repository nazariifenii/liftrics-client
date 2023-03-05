import R from "ramda";
import React from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button, ListItem, Avatar, Rating } from "react-native-elements";
import { NavigationProp } from "@react-navigation/native";

import SectionHeader from "../../components/SectionHeader";
import ListItemRow from "../../components/ListItemRow";
import OrderRow from "../../components/OrderRow";
import ListItemSeparator from "../../components/ListItemSeparator";
import OptionsHeaderButton from "../../components/OptionsHeaderButton";

import {
  downloadContactById,
  applyToOrder,
  deleteOrder,
  finishOrder,
  leaveFeedback,
} from "../../store/actions";

import styles from "./styles";
import UserDataRow from "../../components/UserDataRow";
import ActionSelectModal from "./ActionSelectModal";
import { ThunkDispatch } from "redux-thunk";

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  const orderData = state.order.ordersDataById[params.orderId] || {};
  const userList = state.users.userList || {};
  return {
    orderData,
    userList,
    authUserId: state.auth.userId,
    contactData: (orderData.creator && userList[orderData.creator]) || {},
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, never, any>) => {
  return {
    downloadContactById: (contactId: string) =>
      dispatch(downloadContactById(contactId)),
    applyToOrder: (orderId: string) => dispatch(applyToOrder(orderId)),
    deleteOrder: (orderId: string) => dispatch(deleteOrder(orderId)),
    finishOrder: (driverId: string) => dispatch(finishOrder(driverId)),
    leaveFeedback: (userId: string, orderId: string, leftRating: number) =>
      dispatch(leaveFeedback(userId, orderId, leftRating)),
  };
};

type OrderData = {
  _id: string;
  applicantslist: Array<string>;
  creator: string;
  status: string;
  driverId: string;
  suggestedPrice: number;
  destinationStreet: string;
  primaryStreet: string;
  createdAt: string;
  packageWeight: number;
  imageUrl: string;
  packageSize: string;
};

type Props = {
  authUserId: string;
  orderData: OrderData;
  navigation: NavigationProp<any, never, any>;
  userList: Record<number, Object>;
  router: any;
  contactData: User;
  downloadContactById: (contactId: string) => void;
  applyToOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  finishOrder: (orderId: string) => void;
  leaveFeedback: (userId: string, orderId: string, leftRating: number) => void;
};

type State = {
  destinationAdress: string;
  proposedPrice: number;
  actionModaVisible: boolean;
  rating: number | null;
};

type User = {
  firstName: string;
  imageUrl: string;
  userTotalRating: number;
};

class DeliveryDetailsScreen extends React.Component<Props, State> {
  static navigationOptions = ({
    navigation,
  }: {
    navigation: NavigationProp<any, never, any>;
  }) => {
    const { params = {} } = navigation.state;
    return {
      headerBackTitle: "Назад",
      title: "Деталі замовлення",
      headerRight: params.showOptionsButton && (
        <OptionsHeaderButton onPress={params.showActionModal} />
      ),
    };
  };

  componentDidMount() {
    this.props.downloadContactById(this.props.orderData.creator);
    this.props.navigation.setParams({
      showActionModal: this.showActionModal,
      showOptionsButton: this.props.orderData.creator === this.props.authUserId,
    });
  }

  state: State = {
    proposedPrice: this.props.orderData.suggestedPrice || 0,
    actionModaVisible: false,
    rating: null,
  };

  onSubmitPress = () => {
    const { params } = this.props.router;
    this.props.applyToOrder(params.orderId);
  };

  onProposedPricePress = () => {
    this.props.navigation.navigate("InputData", {
      onPress: this.onProposedPriceSelected,
      labelTitle: "Змініть пропоновану вартість доставки",
      screenTitle: "Зміна ціни",
      inputData: this.state.proposedPrice,
    });
  };

  onProposedPriceSelected = (price: number) => {
    this.setState({
      proposedPrice: price,
    });
  };

  onApplicantsListPress = () => {
    const idsArray: string[] = this.props.orderData.applicantslist;
    if (idsArray.length) {
      this.props.navigation.navigate("ApplicantsList", {
        applicantsIds: idsArray,
        orderId: this.props.orderData._id,
      });
    }
  };

  onEndAdressPress = () => {
    this.props.navigation.navigate("InputData", {
      labelTitle: "Введіть кінцеву адресу",
      screenTitle: "Кінцева адреса",
      inputData: this.state.destinationAdress,
    });
  };

  renderDriverRow = (driverData: User) => {
    if (driverData) {
      return (
        <View style={styles.driverRow}>
          <SectionHeader title="Інформація про водія:" />
          <UserDataRow
            userName={driverData.firstName}
            imageUrl={driverData.imageUrl}
            userRating={Number(driverData.userTotalRating)}
          />
        </View>
      );
    } else return null;
  };

  onActionPress = (actionType: "edit" | "delete") => {
    if (actionType === "edit") {
    } else if (actionType === "delete") {
      const { orderData } = this.props;
      if (orderData._id) this.props.deleteOrder(orderData._id);
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 300);
    }
  };

  onFinishOrderPress = () => {
    this.props.finishOrder(this.props.orderData._id);
  };

  showActionModal = () => {
    this.setState({
      actionModaVisible: true,
    });
  };

  hideActionModal = () => {
    this.setState({
      actionModaVisible: false,
    });
  };

  ratingCompleted = (rating: number) => {
    this.setState({
      rating,
    });
  };

  onLeaveRating = () => {
    if (this.state.rating) {
      const { orderData, authUserId } = this.props;
      const myOrder = orderData.creator === authUserId;
      const feedbackUserId = myOrder ? orderData.creator : orderData.driverId;
      this.props.leaveFeedback(
        feedbackUserId,
        this.props.orderData._id,
        this.state.rating
      );
    }
  };

  render() {
    const { contactData, orderData, authUserId, userList } = this.props;

    if (R.isEmpty(contactData) || R.isEmpty(orderData)) {
      return (
        <View style={styles.centeredLoader}>
          <ActivityIndicator />
        </View>
      );
    }

    const notAplied = orderData.applicantslist.indexOf(authUserId) === -1;
    const myOrder = orderData.creator === authUserId;
    const applicantsCount = orderData.applicantslist.length;
    const creationDate = new Date(orderData.createdAt).toLocaleString("ua");
    const avatarImageProps = orderData.imageUrl
      ? { source: { uri: orderData.imageUrl || "" } }
      : { icon: { name: "cube", type: "font-awesome" } };

    return orderData.status === "Finished" &&
      orderData.creator === authUserId ? (
      <View style={{ flex: 1 }}>
        <Text style={styles.leaveFeedbackTitle}>Залишити відгук</Text>
        <Rating
          onFinishRating={this.ratingCompleted}
          style={{ paddingVertical: 10 }}
        />
        <Button
          title="Залишити відгук"
          onPress={this.onLeaveRating}
          style={styles.button}
        />
      </View>
    ) : (
      <ScrollView>
        <View>
          <View style={styles.pictureContainer}>
            <Avatar {...avatarImageProps} size="large" activeOpacity={0.7} />
          </View>
          <View style={styles.orderRowContainer}>
            <OrderRow
              orderId={orderData._id}
              primaryStreet={orderData.primaryStreet}
              destinationStreet={orderData.destinationStreet}
              creationDate={orderData.createdAt}
              orderWeight={orderData.packageWeight}
              orderSize={orderData.packageSize}
            />
          </View>

          <SectionHeader title="Інформація про замовника:" />
          <UserDataRow
            userName={contactData.firstName}
            imageUrl={contactData.imageUrl}
            userRating={Number(contactData.userTotalRating)}
          />

          {myOrder && !orderData.driverId ? (
            applicantsCount ? (
              <View style={styles.applicantsRow}>
                <ListItemSeparator />
                <ListItem
                  leftIcon={{ name: "people-outline", type: "ionicons" }}
                  title="Список заявок на виконання"
                  badge={{
                    value: applicantsCount,
                    textStyle: { marginHorizontal: 3, fontSize: 15 },
                  }}
                  onPress={this.onApplicantsListPress}
                  chevron
                />
                <ListItemSeparator />
              </View>
            ) : (
              <Text style={styles.informationalText}>
                У Вас ще немає заявок на це замовлення
              </Text>
            )
          ) : (
            this.renderDriverRow(userList[orderData.driverId])
          )}
        </View>

        <View>
          {notAplied ? (
            authUserId !== orderData.creator ? (
              <View style={styles.bottomContainer}>
                <ListItemRow
                  title="Запропонована ціна"
                  subtitle={this.state.proposedPrice + " ₴"}
                />
                <Button
                  title="Залишити заявку"
                  onPress={this.onSubmitPress}
                  style={styles.button}
                />
              </View>
            ) : null
          ) : (
            orderData.status === "New" && (
              <Text style={styles.informationalText}>
                Ви вже подали заявку на це замовлення
              </Text>
            )
          )}
          {authUserId === orderData.driverId &&
          orderData.status === "In Progress" ? (
            <Button
              title="Завершити замовлення"
              onPress={this.onFinishOrderPress}
              style={styles.button}
            />
          ) : null}
        </View>
        <ActionSelectModal
          isVisible={this.state.actionModaVisible}
          onClose={this.hideActionModal}
          onOptionPress={this.onActionPress}
        />
      </ScrollView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryDetailsScreen);
