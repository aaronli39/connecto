import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import {
	StyleSheet,
	Text,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
	FlatList,
	View,
} from "react-native";
import { Button } from "react-native-paper";
import { CONSTANTS } from "../constants/DataConstants";
import EventCard from "../components/EventCard";
import SearchBar from "react-native-platform-searchbar";

const EventSearch = () => {
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
				let data = response.data.events_results;
				setEventList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		// outer view to encompass entire page
		<View style={{ backgroundColor: "white", height: "100%" }}>
			{/* Flatlist renders all the events, and the header component is all the 
			ui components before that  */}
			<FlatList
				ListHeaderComponent={
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						accessible={false}
					>
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
						</ScrollView>
					</TouchableWithoutFeedback>
				}
				columnWrapperStyle={{ justifyContent: "space-around" }}
				data={eventList}
				numColumns={2}
				keyExtractor={(event, idx) => idx}
				renderItem={(ev) => <EventCard event={ev.item} />}
				ListFooterComponent={<View style={{ height: 24 }}></View>}
			/>
		</View>
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
