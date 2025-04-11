import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen";
import CreateStoryScreen from "./screens/CreateStoryScreen";
import AuthScreen from "./screens/AuthScreen";
import ParentDashboardScreen from './screens/ParentDashboardScreen';
import InteractiveStoryScreen from './screens/InteractiveStoryScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (    <Stack.Navigator screenOptions={{ headerShown: false }}>      
    <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateStory" component={CreateStoryScreen} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboardScreen} />
      <Stack.Screen name="InteractiveStory" component={InteractiveStoryScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Toaster />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});