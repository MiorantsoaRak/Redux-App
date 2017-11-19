//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigator } from "react-navigation";
import { History } from "../../../screens/history";
import headStyle from "../../../styles/stylesC/headerStyle";
import HeaderRight from "../../../screens/history/headerRight";
export default StackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: ({ navigation }) => ({
        title: "Historique",
        headerStyle: headStyle.headerBackground,
        headerTitleStyle: headStyle.headerText,
        headerTintColor: "#fff",
        headerRight: <HeaderRight />,
        headerLeft: (
          <View
            style={{
              alignContent: "center",
              marginHorizontal: 10
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
              <Icon
                name="ios-menu-outline"
                color="white"
                size={30}
                type="ionicon"
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
  },
  { initialRouteName: "History" }
);
