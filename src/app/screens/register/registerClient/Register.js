//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { RoundedButton } from "../../../components/Buttons";
import { Footer } from "../../../components/Footer";
import styles from "../../../styles/stylesC/registerStyles";
import { connect } from "react-redux";
import { registerToAPI } from "../../../actions/register";
import RegisterPin from "./RegisterPin";

// create a component
class Register extends Component {
  render() {
    const { processing, error, registerResponse } = this.props.register;
    if (processing) {
      return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={{ flex: 0.3 }} />
          <View>
            <ActivityIndicator animating={processing} />
          </View>
        </View>
      );
    } else {
      return <RegisterPin navigation={this.props.navigation} />;
    }
  }
}


function mapStateToProps(state) {
  return {
    register: state.register
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: () => dispatch(registerToAPI())
  };
}
export default Register;
