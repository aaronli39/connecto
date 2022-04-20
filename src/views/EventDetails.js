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
	const addToUserEvents = (event) => {
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		updateDoc(docRef, {
			myEvents: arrayUnion({
				thumbnail: event?.thumbnail,
				start_date: event?.date?.start_date,
				title: event?.title,
				description: event?.description,
				venue: event?.venue?.name,
			}),
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
			<View></View>

			<Button onPress={() => addToUserEvents(event)} mode="contained">
				Add event!
			</Button>
		</ScrollView>
	);
};

export default EventDetails;

const styles = StyleSheet.create({});
