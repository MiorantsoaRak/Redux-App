//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Landing from "./Landing";
import { Pin } from "../login";
import { connect } from "react-redux";
import Drawer from "../../config/navigation/navigationClient/Drawer";

// create a component
class Handler extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loggedIn } = this.props.login;
    console.log(this.props, "Mba asehoy ty zavatra ty! :p");
    if (loggedIn) {
      return <Pin navigation={this.props.navigation} />;
    } else {
      return <Landing navigation={this.props.navigation} />;
    }
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
function mapStateToProps(state) {
  return {
    login: state.login,
    register: state.register
  };
}

//make this component available to the app
export default connect(mapStateToProps)(Handler);
