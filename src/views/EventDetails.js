import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { app } from "../views/FirebaseInitialize";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";

// Initialize Firebase
const firestore = getFirestore(app);

// this component renders an event's details given the route params from onPress
const EventDetails = ({ route, navigation }) => {
	const event = route.params;

	// add an event to user's event list
	const addToUserEvents = () => {
		console.log("adding: ", event);
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		updateDoc(docRef, {
			myEvents: arrayUnion(event),
		});
		alert("Event Sucessfully Added!");
	};

	return (
		<ScrollView>
			{/* view for the thumbnail */}
			<View>
				<Image
					source={{ uri: event?.thumbnail }}
					style={{
						width: "100%",
						height: 240,
					}}
					resizeMode="cover"
				/>
			</View>

			{/* Header row with date and title info */}
			<View style={styles.headerContainer}>
				<View>

				</View>
			</View>

			<Button onPress={addToUserEvents} mode="contained">
				Add event!
			</Button>
		</ScrollView>
	);
};

export default EventDetails;

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		flexDirection: "row"
	}
});
