//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  ToastAndroid,
  TextInput,
  Dimensions,
  Keyboard,
  Platform
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import Spinner from "react-native-loading-spinner-overlay";
import { Logo, LogoMini } from "../../../components/Logo";
import { Container } from "../../../components/ContainerC";
import { MyInput } from "../../../components/TextInput";
import Services from "../../../services/services";
import styles from "../../../styles/stylesC/registerStyles";
import { connect } from "react-redux";

// create a component
const { width } = Dimensions.get("window");
class RegisterPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Créer un code PIN",
      isPin2: false,
      isLoading: false,
      pin1: "",
      pin2: ""
    };
  }

  handlePinInput_1 = text => {
    console.log("ddata#########");
    this.setState({ pin1: text });
    if (text.length === 4) {
      this.setState({
        isPin2: !this.state.isPin2,
        text: "Confirmer votre code PIN"
      });
    }
  };

  handlePinInput_2 = text => {
    const { userData } = this.props.login;
    this.setState({ pin2: text });
    console.log("input 2 toggled");
    console.log("Toggle input2", this.state.pin1);
    if (text.length === 4) {
      Keyboard.dismiss();
      if (text == this.state.pin1) {
        services = new Services();
        this.setState({ isLoading: true });
        services.saveData("pin", this.state.pin1).then(() => {
          console.log(userData);
          this.props.navigation.navigate("Drawer");
        });
      } else {
        console.log("Tsy mitovy");
        this.setState({ pin2: "" });
        if (Platform.OS === "android") {
          ToastAndroid.show("Pin non correspondant", ToastAndroid.SHORT);
        } else {
          this.refs.toast.show("Pin non correspondant", 1000);
        }
      }
    }
  };
  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <ActivityIndicator size="large" animating={this.state.isLoading} />
        {Platform.OS === "ios" ? (
          <Toast
            ref="toast"
            position="top"
            fadeInDuration={750}
            fadeOutDuration={1000}
            opacity={0.8}
          />
        ) : null}
        <KeyboardAvoidingView behavior="padding">
          <View>
            <View style={{ flex: 0.7 }} />
            <LogoMini
              style={{
                marginBottom: 50
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#aaa",
                fontWeight: "300"
              }}
            >
              {this.state.text}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#aaa",
                borderRadius: 40,
                height: 50,
                width: width - 50,
                paddingVertical: 10
              }}
            >
              {this.state.isPin2 ? (
                <TextInput
                  keyboardType="numeric"
                  autoFocus={true}
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    paddingHorizontal: 5
                  }}
                  underlineColorAndroid="transparent"
                  value={this.state.pin2}
                  onChangeText={this.handlePinInput_2}
                  secureTextEntry={true}
                  maxLength={4}
                />
              ) : (
                <TextInput
                  keyboardType="numeric"
                  autoFocus={true}
                  underlineColorAndroid="transparent"
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    paddingHorizontal: 5
                  }}
                  onChangeText={this.handlePinInput_1}
                  secureTextEntry={true}
                  maxLength={4}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

//make this component available to the app
function mapStateToProps(state) {
  return {
    login: state.login
  };
}

//make this component available to the app
export default connect(mapStateToProps)(RegisterPin);
