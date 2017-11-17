//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { StackNavigator } from "react-navigation";
import { Button, Header, Icon } from "react-native-elements";
import { InputButton } from "../../components/TextInput";
import CancelKeyButton from "../../components/Buttons/CancelKeyButton";
import { connect } from "react-redux";
import headStyle from "../../styles/stylesC/headerStyle";
// create a component
const inputButtons = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [".", 0, ""]];
class CustomKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      user_id: this.props.login.userData.code,
      accountName: this.props.login.userData.username,
      receiver_name: this.props.navigation.state.params.receiver_name,
      inputValue: 0.0
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backHandler);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backHandler);
  }
  backHandler = () => {
    this.props.navigation.state.params.onGoBack();
  };

  _onInputButtonPressed(input) {
    switch (typeof input) {
      case "number":
        this._handleNumberInput(input);
        break;
      case "string":
        if (input === ".") {
          var decimal = parseFloat(
            Math.round(this.state.inputValue * 100) / 100
          ).toFixed(1);
          this.setState({ inputValue: decimal });
        }
    }
  }

  _handleNumberInput(num) {
    if (this.state.inputValue.toString().includes(".")) {
    }
    let inputValue = this.state.inputValue * 10 + num;

    this.setState({
      inputValue: inputValue
    });
  }
  _handleDelete() {
    var stripped = Math.floor(this.state.inputValue / 1e1);
    this.setState({ inputValue: stripped });
  }
  _handleContinue() {
    console.log("continue");
    this.props.navigation.navigate("Review", {
      user: this.state.user,
      username: this.state.accountName,
      user_id: this.state.user_id,
      receiver_name: this.state.receiver_name,
      amount: this.state.inputValue
    });
  }
  _renderInputButtons() {
    let views = [];

    for (var r = 0; r < inputButtons.length; r++) {
      let row = inputButtons[r];

      let inputRow = [];
      for (var i = 0; i < row.length; i++) {
        let input = row[i];
        if (r == inputButtons.length - 1 && i == row.length - 1) {
          inputRow.push(
            <CancelKeyButton
              key={r + "-" + i}
              onPress={() => {
                this._handleDelete();
              }}
            />
          );
        } else {
          inputRow.push(
            <InputButton
              value={input}
              key={r + "-" + i}
              onPress={() => this._onInputButtonPressed(input)}
            />
          );
        }
      }

      views.push(
        <View style={styles.inputRow} key={"row-" + r}>
          {inputRow}
        </View>
      );
    }

    return views;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, backgroundColor: "#193441" }}>
          <Text style={styles.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={{ flex: 6, backgroundColor: "#3E606F" }}>
          {this._renderInputButtons()}
        </View>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            style={{
              justifyContent: "center",
              backgroundColor: "#193441",
              flex: 1
            }}
            onPress={() => {
              this._handleContinue();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff"
              }}
            >
              Continuer
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  inputRow: {
    flex: 1,
    flexDirection: "row"
  },
  displayText: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "right",
    padding: 20
  }
});

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

//make this component available to the app
export default connect(mapStateToProps)(CustomKey);
