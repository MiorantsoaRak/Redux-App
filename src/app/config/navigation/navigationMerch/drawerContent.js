import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { styleBase } from "../../../styles";
import { Icon } from "react-native-elements";
import Services from "../../../services/services";
import * as Animatable from "react-native-animatable";
import { Notifications } from "expo";
import { connect } from "react-redux";
import { fetchSoldeFromAPI } from "../../../actions/solde";

const back = require("../../../images/backHeader.jpg");
const logoFromFile = require("../../../images/icons/user.png");

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
    this.state = {
      solde: this.props.login.userData.solde,
      account_id: this.props.login.userData.code,
      alias: "",
      username: this.props.login.userData.username,
      date: "",
      animation: "",
      notification: {}
    };
  }

  componentWillMount() {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  // componentDidMount() {
  //   this.getUserInfo();
  // }

  componentWillUnmount() {
    this._notificationSubscription.remove();
  }

  _handleNotification = notification => {
    this.checkSolde();
  };

  getSolde() {
    return this.state.solde;
  }

  checkSolde() {
    this.props.fetchSold(this.state.account_id);
  }

  refresh() {
    this.checkSolde();
  }

  render() {
    const { userData } = this.props.login;
    const { isFetching, solde } = this.props.solde;
    const soldeFormated = Services.formatNumber(this.getSolde());
    return (
      <View style={styles.container}>
        <Image source={back} style={styles.imageBack} resizeMethod="scale">
          <View
            style={[
              styles.logoContainer,
              {
                flexDirection: "row"
              }
            ]}
          >
            <Icon
              name="account-circle"
              size={70}
              color="rgba(26, 188, 156,1.0)"
            />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Text style={[styleBase.textWhiteBold, { fontSize: 25 }]}>
                {this.state.username}
              </Text>
              <View
                style={{
                  flexDirection: "row"
                }}
              >
                <Text style={styleBase.textWhiteBold}>
                  <Text style={{ fontSize: 30 }}>{soldeFormated} Ar</Text>
                </Text>
                <TouchableOpacity
                  style={[
                    styleBase.centered,
                    styles.refreshContainer,
                    { alignContent: "flex-end" }
                  ]}
                  activeOpacity={0.4}
                  onPress={this.refresh.bind(this)}
                >
                  <Animatable.View
                    ref="spinner"
                    animation={this.state.isrefreshing ? "rotate" : ""}
                    iterationCount={"infinite"}
                    Easing={"linear"}
                  >
                    <Icon
                      name="refresh"
                      size={23}
                      color="#FFF"
                      containerStyle={styleBase.centered}
                    />
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    height: 170
  },
  imageBack: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoContainer: {
    height: "100%"
  },
  logo: {
    height: "100%"
  },
  textWhiteRight: { fontSize: 20, color: "#fff", textAlign: "right" },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20
  },
  textContainer: {
    width: "80%"
  },
  refreshContainer: {
    width: "20%"
  }
});

function mapStateToProps(state) {
  return {
    login: state.login,
    solde: state.solde
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSold: accountId => dispatch(fetchSoldeFromAPI(accountId))
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
