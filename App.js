import React from "react";
import LoginScreen from "./LoginScreen";
import ChatScreen from "./ChatScreen";
import "./firebaseConfig";
import GameScreen from "./screens/GameScreen";
import RoomList from "./screens/RoomList";
import CreateRoom from "./screens/CreateRoom";
import RoomIndexScreen from "./screens/RoomIndexScreen";
import EditScreen from "./screens/EditScreen";
import ShowRoomScreen from "./screens/ShowRoomScreen";
import { RoomProvider } from "./screens/RoomContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import { Feather } from "@expo/vector-icons"; // Import Feather icons

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Game") {
            iconName = focused ? "activity" : "activity";
          } else if (route.name === "Index") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3498db", // Active tab color
        inactiveTintColor: "#bdc3c7", // Inactive tab color
        style: {
          backgroundColor: "#fff", // Background color of the tab bar
        },
      }}
    >
      <Tab.Screen name="Game" component={GameScreen} />
      <Tab.Screen name="Index" component={RoomIndexScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* Add other tab screens here */}
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RoomProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#3498db", // Header background color
            },
            headerTintColor: "#fff", // Header text color
            headerTitleStyle: {
              fontWeight: "bold", // Header title font weight
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          {/* Add other screens here */}
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ title: "PLAY2GETHER" }}
          />
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{ title: "Edit Room" }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="Create"
            component={CreateRoom}
            options={{ title: "Create Room" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoomProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
