import Constants from "expo-constants";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CurrentEvents from "./CurrentEvents";
import PastEvents from "./PastEvents";
import ProfilePictureStockPhoto from "../assets/pfp-stock.jpg";

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
			<View style={styles.profilePictureContainer}>
				<Image
					source={ProfilePictureStockPhoto}
					style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
				/>
				<Text style={styles.profilePictureText}>Sample User</Text>
			</View>
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
	profilePictureContainer: {
		marginTop: Constants.statusBarHeight / 2,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	profilePictureText: {
		width: "100%",
		textAlign: "center",
		marginTop: Constants.statusBarHeight / 5,
	},
	welcomeMessageText: {
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		width: "100%",
		marginTop: Constants.statusBarHeight / 2,
		marginBottom: Constants.statusBarHeight / 2,
	},
});
