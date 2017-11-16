//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import Test from "./app/screens";
import configureStore from "./app/store/configureStore";
import Navigation from "./app/config/navigation/navigationClient/routes";
import { Landing } from "./app/screens/home";
import EStyleSheet from "react-native-extended-stylesheet";
import { stop } from "expo/src/Speech";

EStyleSheet.build({
  // outline: 1,
  $primaryBlue: "#34495e",
  $white: "#FFFFFF",
  $darkColor: "#1C2E48",
  $lightGray: "#E6E6E6",
  $border: "#E2E2E2",
  $darkColor: "#1C2E48",
  $primaryColor: "#128FB5",
  $inputText: "#797979",
  $darkText: "#343434",
  $primaryGreen: "#1e9228",
  $inputBG: "rgba(250,250,250,0.8)"
});

const store = configureStore();
// create a component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar hidden={true} />
          <Navigation />
        </View>
      </Provider>
    );
  }
}
//make this component available to the app
export default App;
