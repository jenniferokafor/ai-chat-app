import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./screens/Chat";
import Welcome from "./screens/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const queryClient = new QueryClient();
  const Stack = createNativeStackNavigator();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Welcome} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
