import * as React from "react";
import Constants from "expo-constants";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import EventSearch from "./views/EventSearch";
import ProfileScreen from "./views/ProfileScreen";
import Swipe from "./views/Swipe";
import Events from "./views/Events";
import Messages from "./views/Messages";
import { View } from "react-native";
import SwipeSelect from "./views/SwipeSelect";

// constant names
const homeName = "Home";
const profileName = "Profile";
const swipeName = "Swipe";
const eventsName = "Events";
const messagesName = "Messages";

// the navigators
const Tab = createBottomTabNavigator();

export default function MainContainer() {
	return (
		<>
			{/* status bar top view */}
			<View
				style={{ height: Constants.statusBarHeight, backgroundColor: "white" }}
			>
				<StatusBar />
			</View>

			{/* tabs to navigate */}
			<Tab.Navigator
				style={{
					backgroundColor: "#007ae6",
					position: "sticky",
					fixed: "bottom",
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let routeName = route.name;

						if (routeName === homeName) {
							iconName = focused ? "home" : "home-outline";
						} else if (routeName === profileName) {
							iconName = focused ? "person" : "person-outline";
						} else if (routeName === swipeName) {
							iconName = focused ? "caret-forward-circle" : "caret-forward-circle-outline";
						} else if (routeName === eventsName) {
							iconName = focused ? "calendar" : "calendar-outline";
						} else if (routeName === messagesName) {
							iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen
					options={{ headerShown: false }}
					name={homeName}
					component={EventSearch}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					name={eventsName}
					component={Events}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					name={profileName}
					component={ProfileScreen}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					name={swipeName}
					component={SwipeSelect}
				/>
				<Tab.Screen
					options={{ headerShown: false }}
					name={messagesName}
					component={Messages}
				/>
			</Tab.Navigator>
		</>
	);
}
