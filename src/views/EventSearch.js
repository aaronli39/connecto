import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import {
	StyleSheet,
	Text,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Button, Searchbar, useTheme } from "react-native-paper";
import { CONSTANTS } from "../constants/DataConstants";
import EventCard from "../components/EventCard";
import SearchBar from "react-native-platform-searchbar";

const EventSearch = () => {
	const { colors } = useTheme();
	const styles = StyleSheet.create({
		container: {
			backgroundColor: "#fff",
			padding: "4%",
		},
		welcomeMessageText: {
			fontWeight: "bold",
			fontSize: 24,
			textAlign: "center",
			width: "100%",
			marginTop: Constants.statusBarHeight * 2,
		},
		searchButton: {
			width: "50%",
			alignSelf: "center",
			marginTop: 20,
		},
		searchBox: {
			marginTop: 40,
			width: "90%",
			maxWidth: 340,
			borderRadius: 20,
			alignSelf: "center",
			justifyContent: "center",
		},
	});

	const [searchInput, setSearchInput] = useState("");
	const [eventList, setEventList] = useState([]);

	const fetchSearchResults = () => {
		Keyboard.dismiss();
		console.log("fetching now...");
		const searchTerm = searchInput.replace(" ", "+");
		console.log(searchTerm);
		const url = CONSTANTS.serpApiP1 + searchTerm + CONSTANTS.serpApiP2;
		axios
			.get(url)
			.then((response) => {
				console.log(response.data.events_results);
				let data = response.data.events_results;
				setEventList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
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
				<Button
					mode="outlined"
					style={styles.searchButton}
					onPress={fetchSearchResults}
				>
					Search
				</Button>

				{eventList.map((event, idx) => (
					<EventCard key={idx} event={event} />
				))}
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default EventSearch;
