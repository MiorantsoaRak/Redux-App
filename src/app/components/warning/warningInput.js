//import liraries
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styleBase } from "../../styles";

// create a component
class WarningInput extends Component {
  render() {
    return (
      <View>
        <View style={styles.invalidInput}>
          <Icon name="warning" size={15} color={"rgba(231, 76, 60,1.0)"} />
          <Text style={styles.invalidInputText}>{this.props.warningText}</Text>
        </View>
      </View>
    );
  }
}

//make this component available to the app
export default WarningInput;
