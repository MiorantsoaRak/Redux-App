//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Test from "./app/screens";
import configureStore from "./app/store/configureStore";

const store = configureStore();
// create a component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Test />
      </Provider>
    );
  }
}
//make this component available to the app
export default App;
