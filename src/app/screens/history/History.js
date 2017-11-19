//import liraries
import React, { Component } from "react";
import { List, ListItem, Icon, Button } from "react-native-elements";
import {
  SectionList,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  RefreshControl,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  NetInfo
} from "react-native";
import colors from "color";
import EStyleSheet from "react-native-extended-stylesheet";
import headStyle from "../../styles/stylesC/headerStyle";
import HistoryServices from "../../services/history";
import Services from "../../services/services";
import { styleBase } from "../../styles";
import styles from "../../styles/stylesC/historyStyle";
import moment from "moment";
import numeral from "numeral";
import TimerMixin from "react-timer-mixin";
import timer from "react-native-timer";
import SearchBar from "react-native-searchbar";
import { Notifications } from "expo";
import { StackNavigator } from "react-navigation";
import RowEmpty from "./rowEmpty";
import { DrawerMenu } from "../../components/drawerMenu";
import HeaderRight from "./headerRight";
import Error from "./errorHistory";
import _ from "lodash";
import "moment/locale/fr";
import { connect } from "react-redux";
import {
  fetchHistoryFromApi,
  fetchHistory,
  fetchHistorySuccess,
  fetchHistoryIn,
  fetchHistoryOut,
  fetchHistoryAll,
  showSearchBar,
  hideSearchBar
} from "../../actions/history";
// create a component

class History extends React.Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      user_id: this.props.login.userData.code,
      accountName: this.props.login.userData.username,
      data: this.props.history.history,
      loading: true,
      refreshing: false,
      online: true,
      syncing: true,
      dataBrute: null,
      error: null,
      extraMargin: null,
      emptyData: null,
      showAll: true,
      showIn: false,
      showOut: false
    };
    this._handleResults = this._handleResults.bind(this);
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
    this.getHistory();
  }

  reinitialiseData() {
    const { data } = this.props.history;
    this.setState({
      data: this.parseHistoryData(this.state.data),
      extraMargin: null
    });
    this.searchBar.hide();
  }

  componentWillUnmount() {
    this._notificationSubscription.remove();
    timer.clearTimeout(this);
  }

  parseHistoryData(historyData) {
    const historyServices = new HistoryServices();
    history = historyServices.refactHistory(historyData);
    history = _.reduce(
      history,
      (acc, next, index) => {
        acc.push({
          key: index,
          data: next
        });
        return acc;
      },
      []
    );
    return history;
  }

  _handleNotification = notification => {
    this._onRefresh();
  };

  showSearchBar() {
    this.searchBar.show();
    this.setState({
      extraMargin: { marginTop: 60 }
    });
  }

  setAccount(user_Id) {
    this.setState({
      user_id: user_Id
    });
  }

  waiting() {
    return (
      <View>
        <RowEmpty />
        <RowEmpty />
        <RowEmpty />
      </View>
    );
  }

  // setData(response) {
  //   if (response.length == 0) {
  //     this.createEmptyText();
  //   } else {
  //     hServices = new HistoryServices();
  //     this.setState({
  //       syncing: false,
  //       loading: false,
  //       refreshing: false,
  //       dataBrute: response,
  //       data: this.parseHistoryData(response),
  //       dataAll: this.parseHistoryData(response),
  //       dataIn: this.parseHistoryData(
  //         hServices.getReceivedTransaction(response, this.state.user_id)
  //       ),
  //       dataOut: this.parseHistoryData(
  //         hServices.getSentTransactionData(response, this.state.user_id)
  //       )
  //     });
  //   }
  // }

  createEmptyText() {
    this.setState({
      emptyData: (
        <View style={[style.dataEmpty, styleBase.centered]}>
          <Icon
            name="ios-close"
            reverse
            color="rgba(189, 195, 199,1.0)"
            size={30}
            type="ionicon"
          />
          <View style={styleBase.centered}>
            <Text style={style.dataEmptyText}>Liste de transaction vide</Text>
          </View>
          <Button
            small
            title="RECHARGER"
            buttonStyle={[style.refreshBtnStyle]}
            onPress={this._onRefresh.bind(this)}
          />
        </View>
      )
    });
  }

  _onRefresh() {
    this.getHistory();
  }

  stopSynchronised() {
    this.setState({ error: null });
  }

  getHistory() {
    this.props.getHistory(this.state.user_id);
  }

  _handleResults(results) {
    //Mila ovaina
    this.props.searchHistory(results);
  }

  formatCurrencyAndAmount(currency, amount, senderId) {
    //#4caf50
    let sign = "+";
    console.log("ty le amount", amount);
    if (amount < 0) {
      sign = "-";
      amount = amount.replace("-", "");
    }
    if (senderId == this.state.user_id) {
      sign = "-";
    }
    let desired = amount.replace(/[^\w\s]/gi, "");
    return sign + " " + desired + " " + currency;
  }

  getColor(amount, senderId) {
    let color = "#4caf50";
    if (amount < 0) {
      color = "#0a0a0a";
    }
    if (senderId == this.state.user_id) {
      color = "#0a0a0a";
    }
    return color;
  }

  getIcon(amount, comment) {
    let iconName = "directions";
    color = "#e4795f";
    if (amount < 0) {
      color = "#e4795f";
      if (amount < -1000) {
        iconName = "present";
      }
    }
    return (
      <Icon
        name={iconName}
        iconStyle={{ margin: 0 }}
        type="simple-line-icon"
        reverse={true}
        size={20}
        color={color}
      />
    );
  }

  renderItem = item => {
    return (
      <View style={[styles.listStyle, { justifyContent: "space-between" }]}>
        <View style={styles.mainContent}>
          <View style={styles.iconWrapper}>
            {this.getIcon(item.item.amount, item.item.comment)}
          </View>
          <View style={[styles.contentBody]}>
            <Text style={styles.listTitle}>
              {item.item.senderId == this.state.user_id
                ? item.item.recipientId
                : item.item.senderId}
            </Text>
            <Text style={styles.subtitle}>{item.item.type}</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text
            style={[
              styles.amount,
              { color: this.getColor(item.item.amount, item.item.senderId) }
            ]}
          >
            {this.formatCurrencyAndAmount(
              //item.item.currency,
              "Ar",
              Services.formatNumber(item.item.amount),
              item.item.senderId
            )}
          </Text>
          <Text style={[styles.subtitle, { textAlign: "right" }]}>
            {moment(item.item.date, "YYYY-MM-DD hh:mm:ss").format("HH:mm")}
          </Text>
          <View />
        </View>
      </View>
    );
  };

  renderHeader = headerItem => {
    return (
      <View
        style={{
          height: 30,
          marginTop: 10,
          justifyContent: "center",
          backgroundColor: "#fff"
        }}
      >
        <Text style={{ marginLeft: 10 }}>
          {moment(headerItem.section.key, "YYYY-MM-DD").format("Do MMMM YYYY")}
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, loading: true });
    this.getHistory();
  };

  renderLoadingMessage() {
    return (
      <View style={{ backgroundColor: "#FFCC00", paddingVertical: 5 }}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          En attente de syncronisation
        </Text>
      </View>
    );
  }

  renderErrorMessage() {
    return (
      <View style={{ backgroundColor: "red", paddingVertical: 5 }}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          Vous êtes hors connection
        </Text>
      </View>
    );
  }

  renderConnectedMessage() {
    let component = null;
    timer.setTimeout(
      this,
      "hideSuccess",
      () => this.setState({ hideSuccess: true }),
      300
    );
    {
      this.state.hideSuccess
        ? (component = null)
        : (component = (
            <View style={{ backgroundColor: "#00cc00", paddingVertical: 5 }}>
              <Text style={{ textAlign: "center", color: "#fff" }}>
                Syncronisation terminé
              </Text>
            </View>
          ));
    }

    return component;
  }

  _getAllHistory = () => {
    const { history } = this.props.history;
    this.props.getAllHistory(history);
    this.setState({
      showAll: true,
      showIn: false,
      showOut: false
    });
  };
  _getSentHistory = () => {
    this.props.getSentHistory();
    this.setState({
      showAll: false,
      showIn: false,
      showOut: true
    });
  };
  _getReceivedHistory = () => {
    this.props.getReceivedHistory();
    this.setState({
      showAll: false,
      showIn: true,
      showOut: false
    });
  };
  render() {
    const { processing, done, error, data, search } = this.props.history;
    if (search) {
      this.searchBar.show();
    } else {
      this.searchBar.hide();
    }
    let historyData = this.parseHistoryData(data);
    console.log(history);
    let allActive = this.state.showAll
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };
    let inActive = this.state.showIn
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };
    let outActive = this.state.showOut
      ? { tab: style.tabActive, text: style.tabTextActive }
      : { tab: {}, text: {} };

    const underlayColor = colors("#fff").darken(0.1);
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <View style={style.tab}>
          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getAllHistory}
            style={[style.tabButtonStyle, allActive.tab]}
          >
            <Text style={[style.tabTextStyle, allActive.text]}>Tout</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getSentHistory}
            style={[style.tabButtonStyle, outActive.tab]}
          >
            <Text style={[style.tabTextStyle, outActive.text]}>Envoyé</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor={underlayColor}
            onPress={this._getReceivedHistory}
            style={[style.tabButtonStyle, inActive.tab]}
          >
            <Text style={[style.tabTextStyle, inActive.text]}>Reçu</Text>
          </TouchableHighlight>
        </View>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={this.state.dataBrute}
          placeholder="Rechercher"
          handleResults={this._handleResults}
          allDataOnEmptySearch
          onSubmitEditing={() => Keyboard.dismiss()}
          onBack={() => this.reinitialiseData()}
          backButton={<Icon name="keyboard-arrow-up" size={30} />}
        />
        {processing ? (
          <View>
            {this.renderLoadingMessage()}
            <RowEmpty />
            <RowEmpty />
            <RowEmpty />
          </View>
        ) : null}
        {!this.state.online || error ? this.renderErrorMessage() : null}
        {done ? this.renderConnectedMessage() : null}
        <View style={[style.headerList, this.state.extraMargin]} />
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={this.renderItem}
          renderSectionHeader={this.renderHeader}
          sections={historyData}
          keyExtractor={item => item.date}
        />
      </View>
    );
  }
}

const style = EStyleSheet.create({
  downloadContainer: {
    flex: 1,
    position: "absolute",
    bottom: 1,
    width: "100%",
    paddingVertical: 8,
    backgroundColor: "rgba(236, 240, 241,1.0)",
    marginBottom: -1
  },
  headerList: {},
  greyText: {
    color: "rgba(52, 73, 94,1.0)"
  },
  tab: {
    flexDirection: "row",
    height: 50,
    // justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "$border"
  },
  tabButtonStyle: {
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "$border"
  },
  tabTextStyle: {
    color: "$border",
    fontWeight: "bold"
  },
  tabTextActive: {
    color: "#000"
  },
  listView: {
    flex: 1
  },
  connexionError: {
    flexDirection: "row",
    backgroundColor: "rgba(231, 76, 60,1.0)",
    paddingVertical: 3
  },
  connexionErrorText: {
    color: "white",
    textAlign: "center"
  },
  dataEmpty: {
    marginTop: 20
  },
  dataEmptyText: {
    fontSize: 25
  },
  refreshBtnStyle: {
    marginTop: 10,
    backgroundColor: "$darkColor"
  }
});

const navigationOptions = {
  headerStyle: headStyle.headerBackground,
  headerTitleStyle: headStyle.headerText,
  headerTintColor: "#fff"
};

function mapStateToProps(state) {
  return {
    login: state.login,
    history: state.history
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHistory: accountId => dispatch(fetchHistoryFromApi(accountId)),
    showSearchBar: () => dispatch(showSearchBar()),
    hideSearchBar: () => dispatch(hideSearchBar()),
    getAllHistory: history => dispatch(fetchHistoryAll(history)),
    getSentHistory: () => dispatch(fetchHistoryOut()),
    getReceivedHistory: () => dispatch(fetchHistoryIn()),
    searchHistory: results => dispatch(fetchHistorySuccess(results))
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(History);
