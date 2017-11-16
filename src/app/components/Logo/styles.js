import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

const imageWidth = Dimensions.get("window").width / 2;
export default EStyleSheet.create({
  $largeContainerSize: imageWidth - 50,
  $largeImageSize: imageWidth / 2,
  markWrap: {
    alignItems: "center"
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    width: "$largeContainerSize",
    height: "$largeContainerSize"
  },
  mark: {
    width: imageWidth
  },
  logoText: {
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center"
  }
});
