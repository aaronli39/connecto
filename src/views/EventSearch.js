import Constants from "expo-constants";
import React, { useState } from "react";
import axios from "axios";
import {
	StyleSheet,
	Text,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
	View,
	TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { CONSTANTS } from "../constants/DataConstants";
import EventCard from "../components/EventCard";
import SearchBar from "react-native-platform-searchbar";

// this component renders the home page that allows users to search for an event
const EventSearch = ({ navigation }) => {
	const [searchInput, setSearchInput] = useState("");
	const [eventList, setEventList] = useState([]);

	// do api call to fetch results
	const fetchSearchResults = () => {
		Keyboard.dismiss();
		console.log("fetching now...");
		const searchTerm = searchInput.replace(" ", "+");
		console.log(searchTerm);
		const url = CONSTANTS.serpApiP1 + searchTerm + CONSTANTS.serpApiP2;
		axios
			.get(url)
			.then((response) => {
				let data = response.data.events_results;

				// modify data to create data format consistency
				let toAdd = [];
				data.forEach((ev) => {
					let obj = {
						thumbnail: ev?.thumbnail,
						start_date: ev?.date?.start_date,
						title: ev?.title,
						description: ev?.description,
						venue: ev?.venue?.name,
					};
					toAdd.push(obj);
				});
				setEventList(toAdd);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// navigate to specific event details page
	const viewEventDetailsPage = (event) => {
		navigation.navigate("Event Details", { ...event, buttonStyle: "accept" });
	};

	return (
		// outer view to encompass entire page
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView
				style={styles.container}
				keyboardShouldPersistTaps="handled"
				alignContent="center"
			>
				<Text style={styles.welcomeMessageText}>
					Welcome! Search for an event below!
				</Text>
				<SearchBar
					value={searchInput}
					placeholder="enter an event..."
					style={styles.searchBox}
					cancelText=""
					onChangeText={(text) => setSearchInput(text)}
				/>
				<TouchableOpacity
					style={styles.commandButton}
					onPress={fetchSearchResults}
				>
					<Text style={styles.panelButtonTitle}>Search</Text>
				</TouchableOpacity>

				{/* display the event cards */}
				<View style={styles.eventListContainer}>
					{eventList?.map((ev, idx) => (
						<EventCard
							event={ev}
							key={idx}
							onClickEvent={() => viewEventDetailsPage(ev)}
						/>
					))}
				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default EventSearch;

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
	},
	searchBox: {
		marginTop: 40,
		width: "90%",
		maxWidth: 340,
		borderRadius: 20,
		alignSelf: "center",
		justifyContent: "center",
	},
	eventListContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		paddingBottom: 48,
	},
	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: "#007ae6",
		alignItems: "center",
		width: "50%",
		alignSelf: "center",
		marginTop: 20,
	  },
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: "bold",
		color: "white",
	  },
});
