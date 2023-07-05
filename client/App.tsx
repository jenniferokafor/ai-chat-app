import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./screens/Chat";
import Welcome from "./screens/Welcome";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {/*<Chat />*/}
        <Welcome />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
