import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { fetchPeopleFromAPI, emptyPeople } from "../actions/actions";
import { loggedIn, logout, logoutUser } from "../actions/loginAction";

// create a component
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isFetching, people } = this.props.people;
    const { loggedIn } = this.props;
    console.log(this.props, loggedIn);
    return (
      <View style={styles.container}>
        {loggedIn ? (
          <View>
            <Text>Vous êtes connecté</Text>
            <TouchableHighlight
              style={styles.button}
              onPress={this.props.logout}
            >
              <Text>Déconnexion</Text>
            </TouchableHighlight>
            <Text>React redux App</Text>
            <TouchableHighlight
              onPress={this.props.getPeople}
              style={styles.button}
            >
              <Text>Fetch</Text>
            </TouchableHighlight>
            {isFetching && <Text>Loading</Text>}
            {people.length
              ? people.map((person, index) => {
                  return (
                    <View key={index}>
                      <Text>Name: {person.name}</Text>
                      <Text>Birth: {person.birth_year}</Text>
                    </View>
                  );
                })
              : null}
          </View>
        ) : (
          <TouchableHighlight onPress={this.props.login} style={styles.button}>
            <Text>Login</Text>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

//import liraries

// create a component

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    people: state.people,
    loggedIn: state.login.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPeople: () => dispatch(fetchPeopleFromAPI()),
    emptyPeople: () => dispatch(emptyPeople()),
    login: () => dispatch(loggedIn()),
    logout: () => dispatch(logoutUser())
  };
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(App);
