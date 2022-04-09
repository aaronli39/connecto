import Constants from "expo-constants";
import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CurrentEvents from "./CurrentEvents";
import PastEvents from "./PastEvents";

// styling for the tab bar
const renderTabBar = (props) => (
	<TabBar
		{...props}
		inactiveColor="lightgray"
		activeColor="black"
		tabStyle={{ borderRightWidth: 1, borderLeftWidth: 1 }}
		pressColor="gray"
		indicatorStyle={{ backgroundColor: "black" }}
		style={{
			backgroundColor: "white",
			borderColor: "black",
			borderTopWidth: 2,
			borderBottomWidth: 1,
		}}
	/>
);

// contains the routes and the components
// associated with the specific route
const renderScene = SceneMap({
	first: CurrentEvents,
	second: PastEvents,
});

const Events = () => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "first", title: "Current Events" },
		{ key: "second", title: "Past Events" },
	]);

	return (
		// outer view for the tabs
		<View style={{ backgroundColor: "white", height: "100%" }}>
			<Text style={styles.welcomeMessageText}>Your Events</Text>
			<TabView
				renderTabBar={renderTabBar}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
		</View>
	);
};

export default Events;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: "4%",
	},
	welcomeMessageText: {
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		width: "100%",
		marginTop: Constants.statusBarHeight,
		marginBottom: Constants.statusBarHeight,
	},
});
