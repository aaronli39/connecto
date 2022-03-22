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
import {
	Button,
	TextInput,
	Card,
	Title,
	Paragraph,
	useTheme,
} from "react-native-paper";
import { CONSTANTS } from "../constants/DataConstants";

const EventSearch = ({ navigation }) => {
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
			marginTop: 10,
		},
		searchBox: {
			marginTop: 40,
			width: 240,
			alignSelf: "center",
		},
		cardContainer: {
			marginTop: 20,
			borderRadius: 10,
			elevation: 8,
			borderColor: colors.primary,
			borderStyle: "solid",
			borderWidth: 1,
		},
		cardCover: {
			marginTop: 8,
			width: "50%",
			alignSelf: "center",
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
				// console.log(response.data.events_results);
				let data = response.data.events_results;
				setEventList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ScrollView style={styles.container}>
				<Text style={styles.welcomeMessageText}>
					Welcome! Search for an event below!
				</Text>
				<TextInput
					label="Search Event"
					value={searchInput}
					placeholder="enter event..."
					style={styles.searchBox}
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
					<Card key={idx} style={styles.cardContainer}>
						<Card.Content style={styles.cardContent}>
							<Title>{event.title}</Title>
							<Paragraph>{event.description}</Paragraph>
							<Card.Cover
								style={styles.cardCover}
								source={{ uri: `${event?.thumbnail}` }}
							/>
						</Card.Content>
					</Card>
				))}
			</ScrollView>
		</TouchableWithoutFeedback>
	);
};

export default EventSearch;
