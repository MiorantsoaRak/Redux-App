//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  TextInput
} from "react-native";
import { Container } from "../../../components/ContainerC";
import { RoundedButton } from "../../../components/Buttons";
import { Icon } from "react-native-elements";
import { Footer } from "../../../components/Footer";
import Services from "../../../services/services";
import RegisterServices from "../../../services/registerServices";
import { Loader } from "../../../components/loader";
import styles from "../../../styles/stylesC/registerStyles";

// create a component
const { width } = Dimensions.get("window");
let errorMessage = "Donnée entrer non valide";
class RegisterPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      hasError: false,
      username: this.props.navigation.state.params.username,
      modal: null,
      hidePwd: true
    };
  }

  toggleHidePwd() {
    this.setState({ hidePwd: !this.state.hidePwd });
  }

  createLoader(message) {
    this.setState({
      modal: <Loader visibility={true} message={message} />
    });
  }

  removeLoader() {
    this.setState({ modal: null });
  }

  registerNewAccount() {}
  handleContinue() {
    if (this.state.password.length === 0) {
      this.setState({ hasError: true });
      errorMessage = "Ne laisser pas le champ vide";
    } else if (this.state.password.length < 4) {
      this.setState({ hasError: true });
      errorMessage = "Doit comporter au moins 4 caractères";
    } else {
      console.log("continue");
      this.createLoader("Enregistrement en cours");
      let regServices = new RegisterServices();
      regServices
        .saveAccount(this.state.username)
        .then(response => {
          console.log(response);
          this.removeLoader();
          this.props.navigation.navigate("RegisterPin", {
            user_id: this.state.username
          });
        })
        .catch(error => {
          console.log(error, "Ato tsika zao");
          this.removeLoader();
          this.setState({ errorMessage: error.message });
        });
    }
  }
  handleEndEditing() {
    if (this.state.password.length === 0) {
      this.setState({ hasError: true });
      errorMessage = "Ne laisser pas le champ vide";
    } else if (this.state.password.length < 4) {
      this.setState({ hasError: true });
      errorMessage = "Doit comporter au moins 4 caractères";
    }
  }
  render() {
    const inputStyle = [
      {
        width: width - 70,
        borderStyle: "solid",
        borderBottomWidth: 1,
        height: 50,
        marginTop: 20
      }
    ];
    if (this.state.hasError) {
      inputStyle.push({ borderColor: "red" });
    }
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        <View>{this.state.modal}</View>
        <KeyboardAvoidingView behavior="padding">
          <View>
            <View style={{ flex: 0.7 }} />
            <Text style={styles.titleText}>Créer un mot de passe</Text>
            <Text
              style={[
                styles.text,
                styles.textWidth,
                { color: "#aaa", marginTop: 20, alignSelf: "center" }
              ]}
            >
              Votre mot de passe doit comporter au moins 8 caractères
            </Text>
            <View style={inputStyle}>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  marginTop: 25,
                  marginVertical: 10,
                  marginRight: 5,
                  paddingHorizontal: 10
                  // backgroundColor: "red"
                }}
                onPress={() => {
                  this.toggleHidePwd();
                }}
              >
                <View>
                  <Text style={{ color: "#aaa" }}>Afficher</Text>
                </View>
              </TouchableOpacity>
              <TextInput
                style={{
                  //height: 50,
                  fontSize: 15,
                  paddingHorizontal: 10,
                  marginTop: 20,
                  width: width - 120
                }}
                underlineColorAndroid="transparent"
                placeholder="Mot de passe"
                onChangeText={text => {
                  console.log(text);
                  this.setState({
                    hasError: false,
                    password: text
                  });
                }}
                onEndEditing={() => {
                  this.handleEndEditing();
                }}
                secureTextEntry={this.state.hidePwd}
              />
            </View>
            {this.state.hasError ? (
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 10,
                  color: "red"
                }}
              >
                {errorMessage}
              </Text>
            ) : null}
          </View>
        </KeyboardAvoidingView>
        <Footer>
          <View style={[styles.containerWidth, { alignSelf: "center" }]}>
            <RoundedButton
              onPress={() => {
                this.handleContinue();
              }}
              disabled={this.state.hasError}
              color="#1e9228"
              buttonStyle={{
                marginVertical: 15
              }}
              text="Continuer"
            />
          </View>
        </Footer>
      </View>
    );
  }
}

//make this component available to the app
export default RegisterPwd;
