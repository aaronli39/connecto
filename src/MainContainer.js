import * as React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import EventSearch from "./views/EventSearch";
import ProfileScreen from "./views/ProfileScreen";
import Swipe from "./views/Swipe";
import Events from "./views/Events";

const homeName = "Home";
const profileName = "Profile";
const swipeName = "Swipe";
const eventsName = "Events";
const Tab = createBottomTabNavigator();
export default function MainContainer() {
	return (
		<NavigationContainer
			style={{
				backgroundColor: "#071740",
				position: "sticky",
				fixed: "bottom",
			}}
		>
			<SafeAreaView>
				<StatusBar />
			</SafeAreaView>
			<Tab.Navigator
				style={{
					backgroundColor: "#071740",
					position: "sticky",
					fixed: "bottom",
				}}
				initialRouteName={homeName}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let routeName = route.name;

						if (routeName === homeName) {
							iconName = focused ? "home" : "home-outline";
						} else if (routeName === profileName) {
							iconName = focused ? "person" : "person-outline";
						} else if (routeName === swipeName) {
							iconName = focused ? "person" : "person-outline";
						} else if (routeName === eventsName) {
							iconName = focused ? "calendar" : "calendar-outline";
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
					component={Swipe}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
