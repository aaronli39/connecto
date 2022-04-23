import React from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Button } from "react-native-paper";
import { app } from "../views/FirebaseInitialize";
import {
	arrayUnion,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore";

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

	// remote an event
	const removeUserEvent = async () => {
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		const docSnap = await getDoc(docRef);
		let currentEvents = [];
		if (docSnap.exists()) {
			console.log("found");
			currentEvents = docSnap.data().myEvents;
			console.log(currentEvents);
		} else {
			return;
		}

		// find index and check equality
		let indexToRemove = 0;
		for (let i = 0; i < currentEvents.length; i++) {
			const tempEvent = currentEvents[i];
			if (
				tempEvent?.title === event?.title &&
				tempEvent?.start_date === event?.start_date &&
				tempEvent?.description === event?.description
			) {
				indexToRemove = i;
				break;
			}
		}

		// update doc with new list of events
		currentEvents.splice(indexToRemove, 1);
		await setDoc(docRef, { ...docSnap.data(), myEvents: currentEvents });
		navigation.navigate("Events");
		alert("Event removed!");
	};

	return (
		<ScrollView style={{ height: "100%" }}>
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
				<Text style={styles.headerDate}>{event?.start_date}</Text>
				<Text numberOfLines={1} style={styles.headerTitle}>
					{event?.title}
				</Text>
				<View style={styles.headerButtonContainer}>
					{/* check which button to render */}
					{event.buttonStyle === "accept" ? (
						<Button
							style={styles.headerButtonAccept}
							onPress={addToUserEvents}
							mode="contained"
						>
							<Text style={styles.headerButtonText}>Add Event</Text>
						</Button>
					) : (
						<Button
							style={styles.headerButtonRemove}
							onPress={removeUserEvent}
							mode="contained"
							color="red"
						>
							<Text style={styles.headerButtonText}>Delete Event</Text>
						</Button>
					)}
				</View>
			</View>

			{/* venue details */}
			<View>
				<Text style={styles.headerVenueText}>@ {event?.venue}</Text>
			</View>

			{/* event description */}
			<View style={styles.eventDescriptionContainer}>
				<Text style={styles.eventDescriptionText}>{event?.description}</Text>
			</View>
		</ScrollView>
	);
};

export default EventDetails;

const styles = StyleSheet.create({
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		marginTop: 8,
	},
	headerDate: {
		fontWeight: "500",
		fontSize: 24,
		width: "16%",
		textAlign: "center",
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "400",
		width: "44%",
		alignSelf: "flex-end",
		marginBottom: 4,
	},
	headerButtonContainer: {
		width: "40%",
		paddingLeft: 8,
		paddingRight: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	headerButtonAccept: {
		height: 32,
		width: 120,
		marginBottom: 8,
	},
	headerButtonRemove: {
		height: 32,
		width: 140,
		marginBottom: 8,
	},
	headerButtonText: {
		fontSize: 12,
	},
	headerVenueText: {
		fontSize: 16,
		fontWeight: "100",
		paddingLeft: 12,
	},
	eventDescriptionContainer: {
		height: "100%",
		flexGrow: 1,
		alignItems: "center",
		paddingTop: 52,
		paddingLeft: 40,
		paddingRight: 40,
	},
	eventDescriptionText: {
		fontSize: 16,
		fontWeight: "300",
	},
});
