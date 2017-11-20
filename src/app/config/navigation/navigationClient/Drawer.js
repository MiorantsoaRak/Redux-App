//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { DrawerNavigator, StackNavigator, DrawerItems } from "react-navigation";
import { Icon } from "react-native-elements";
import DrawerContent from "../navigationMerch/drawerContent";
import { Send } from "../../../screens/main";
import History from "./HistoryStack";

import headStyle from "../../../styles/stylesC/headerStyle";
import HeaderRight from "../../../screens/history/headerRight";
import { Receive } from "../../../screens/receive/index";

//make this component available to the app

export default DrawerNavigator(
  {
    Home: {
      screen: Send,
      navigationOptions: ({ navigation }) => ({
        title: "Envoyer",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-home-outline" size={25} type="ionicon" />
        ),
        header: () => null
      })
    },
    History: {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        title: "Historique",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-paper-outline" size={25} type="ionicon" />
        )
      })
    },
    Wallet: {
      screen: Receive,
      navigationOptions: ({ navigation }) => ({
        title: "Recevoir",
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-cash-outline" size={25} type="ionicon" />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => (
      <ScrollView>
        <DrawerContent />
        <DrawerItems {...props} />
      </ScrollView>
    )
  }
);
