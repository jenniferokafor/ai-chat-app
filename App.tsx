import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Chat from "./screens/Chat/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Chat />
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
