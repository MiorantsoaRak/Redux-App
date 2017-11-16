import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  TextInput,
  Keyboard,
  Dimensions,
  Alert
} from "react-native";
import { Fingerprint } from "expo";
import { Logo, LogoMini } from "../../components/Logo";
import { InputWithButton, SimpleInput } from "../../components/TextInput";
import { Container } from "../../components/ContainerC";
import { FingerprintRequest } from "../../components/fingerprint";
import styles from "../../styles/stylesC/registerStyles";
import Services from "../../services/services";
const { width } = Dimensions.get("window");
class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pin: "",
      userPin: "",
      haveFingerprint: false,
      errorMessage: null,
      hasPin: false,
      user_id: null
    };
  }

  componentDidMount() {
    let services = new Services();
    Services.haveFingerprint().then(haveFingerprint => {
      this.setState({ haveFingerprint: haveFingerprint });
    });
  }

  handleFingerPrintSuccess = () => {
    this.props.navigation.navigate("Drawer", this.props.userData);
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#fff" }]}>
        {this.state.haveFingerprint ? (
          <FingerprintRequest
            waitTextColor="rgba(22, 160, 133,1.0)"
            onFingerprintSuccess={this.handleFingerPrintSuccess}
          />
        ) : (
          <KeyboardAvoidingView behavior="padding">
            <View>
              <View style={{ flex: 0.8 }} />
              <LogoMini
                style={{
                  marginBottom: 20
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#aaa",
                  fontWeight: "500"
                }}
              >
                Enter your PIN here
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#aaa",
                  borderRadius: 40,
                  height: 50,
                  width: width - 50,
                  paddingVertical: 10,
                  alignSelf: "center"
                }}
              >
                <TextInput
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  autoFocus={true}
                  onChangeText={this.handlePinInput}
                  secureTextEntry={true}
                  value={this.state.pin}
                  maxLength={4}
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    paddingHorizontal: 5
                  }}
                />
              </View>
              {this.state.errorMessage}
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}
export default Pin;
