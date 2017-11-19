//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "./C:/Users/Miora/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/react-redux";
import { showSearchBar } from "../../actions/history";

// create a component
class HeaderRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.showSearchBar()}
          activeOpacity={0.3}
        >
          <Icon
            name="ios-search-outline"
            color="#ecf0f1"
            size={30}
            type="ionicon"
          />
        </TouchableOpacity>
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
    alignContent: "center",
    marginHorizontal: 10,
    backgroundColor: "transparent"
  }
});

//make this component available to the app
function mapStateToProps(state) {
  return {
    history: state.history
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSearchBar: () => {
      dispatch(showSearchBar());
    }
  };
}
export default connect(mapDispatchToProps, mapDispatchToProps)(HeaderRight);
