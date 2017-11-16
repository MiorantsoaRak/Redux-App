//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigator } from "react-navigation";
import { Notifications } from "expo";
import DropdownAlert from "react-native-dropdownalert";
import Landing from "../../../screens/home/Landing";
import { Login, Pin } from "../../../screens/login";
import { Handler } from "../../../screens/home";

// create a component
const MainNavigator = new StackNavigator(
  {
    Handler: {
      screen: Handler,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Handler"
      })
    },
    Landing: {
      screen: Landing,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Home"
      })
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Login"
      })
    },
    Pin: {
      screen: Pin,
      navigationOptions: ({ navigation }) => ({
        header: () => null,
        headerTitle: "Pin"
      })
    }
  },
  { initialRouteName: "Handler" }
);

export default MainNavigator;
