import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import { useEffect } from "react";
import { IWelcome } from "../../interfaces";
// @ts-ignore
const Welcome = ({ navigation }) => {
  const { container, heading, animation } = styles;

  //redirect user after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      //ts-ignore
      navigation.navigate("Chat");
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={container}>
      <Text style={heading}>AI Chat App</Text>
      <View style={animation}>
        <Lottie source={require("../../assets/lottie/welcome.json")} autoPlay />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  heading: {
    fontSize: 32,
  },
  animation: {
    height: 100,
    width: "100%",
    flexShrink: 0,
  },
});
export default Welcome;
