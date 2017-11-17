//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  WebView,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import styleBase from "../../styles/styles";
import { WarningConnexion } from "../../components/warning";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import data from "../../config/appConstants";
import { loginFromAPI } from "../../actions/loginAction";
import { Pin } from "./index";

// const { width, height } = Dimensions.get("window");
const uri = data.uri;
// create a component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerVisibility: false,
      saving: false,
      data: null
    };
  }

  changeSpinnerVisibility(value) {
    this.setState({ spinnerVisibility: value });
  }

  async _onNavigationStateChange(webViewState) {
    if (webViewState.url != uri) {
      this.props.loginToApi(webViewState);
    }
  }

  onErrorLoading(webViewState) {}

  webviewRenderError = (errorDomain, errorCode, errorDesc) => (
    <WarningConnexion />
  );

  return() {
    this.props.navigation.goBack();
  }

  render() {
    errorView = (
      <View>
        <Text>Erreur de connexion</Text>
      </View>
    );
    const { loggedIn, userData } = this.props.login;
    if (!loggedIn) {
      return (
        <View style={styles.container}>
          {loggedIn ? <Text>Vous êtes connécté</Text> : null}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              <ActivityIndicator
                animating={this.state.spinnerVisibility}
                size="large"
              />
              <WebView
                source={{ uri: uri }}
                style={styles.webview}
                onNavigationStateChange={this._onNavigationStateChange.bind(
                  this
                )}
                renderLoading={this.renderLoading}
                onError={this.onErrorLoading.bind(this)}
                renderError={() => this.webviewRenderError()}
                startInLoadingState
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Retour"
                backgroundColor="transparent"
                underlayColor="#000"
                large
                textStyle={styles.buttonText}
                onPress={() => this.return()}
              />
            </View>
          </View>
        </View>
      );
    } else {
      console.log("Efa loggedIn le olona a");
      return <Pin />;
    }
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  webview: { flex: 1 },
  buttonContainer: {},
  buttonText: {
    fontSize: 20,
    color: "rgba(52, 73, 94,1.0)"
  }
});

//make this component available to the app
function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginToApi: webViewState => dispatch(loginFromAPI(webViewState))
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login);
