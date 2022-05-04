import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import { CONSTANTS } from "../constants/DataConstants";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
	getFirestore,
	setDoc,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
	onSnapshot,
} from "firebase/firestore";
import { app } from "./FirebaseInitialize";
// Initialize Firebase
const firestore = getFirestore(app);

// styling for the tab bar
const renderTabBar = (props) => (
	<TabBar
		{...props}
		inactiveColor="lightgray"
		activeColor="black"
		pressColor="gray"
		indicatorStyle={{
			backgroundColor: "#007ae6",
			width: 140,
			left: 30,
		}}
		style={{
			backgroundColor: "white",
			borderColor: "#007ae6",
			borderWidth: 2,
			borderRadius: 12,
			marginLeft: 12,
			marginRight: 12,
		}}
	/>
);

// this component contains the container logic for the Events tab view
const EventSelect = ({ nav }) => {
	const [eventsList, setEventsList] = useState([]);

	// on page load, fetch all user's events
	useEffect(async () => {
		fetchMyEventList();

		const unsub = onSnapshot(
			doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz"),
			(doc) => {
				let allEvents = doc.data().myEvents;
				let currentEvents = [];
				allEvents.forEach((event) => {
					let today = new Date().getTime();
					let eventTime = new Date(event?.start_date + " 2022").getTime();
					console.log(today >= eventTime);
					if (eventTime >= today) currentEvents.push(event);
				});
				console.log(currentEvents);
				setEventsList(currentEvents);
			},
			(error) => console.log(error)
		);

		return () => unsub;
	}, []);

	// fetch user John Doe's events
	const fetchMyEventList = () => {
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					let allEvents = doc.data().myEvents;
					let currentEvents = [];
					allEvents.forEach((event) => {
						let today = new Date().getTime();
						let eventTime = new Date(event?.start_date + " 2022").getTime();
						console.log(today >= eventTime);
						if (eventTime >= today) currentEvents.push(event);
					});
					console.log(currentEvents);
					setEventsList(currentEvents);
				} else {
					console.log("No such document");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// navigate to specific event details page
	const navToSwipe = (event) => {
		console.log("Selected Event");
		console.log(event);
		nav.navigate("Swipes", { ...event });
	};

	return (
		// outer view to encompass entire page
		<View style={{ backgroundColor: "white", height: "100%" }}>
			<ScrollView
				style={styles.container}
				keyboardShouldPersistTaps="handled"
				alignContent="center"
			>
				{/* display the event cards */}
				<View style={styles.eventListContainer}>
					{/* if null, show message, otherwise render cards*/}
					{eventsList?.length === 0 ? (
						<View style={{ marginTop: 100 }}>
							<Text style={{ textAlign: "center" }}>
								You have no events! Go add some from the home page!
							</Text>
						</View>
					) : (
						eventsList?.map((ev, idx) => (
							<EventCard
								event={ev}
								key={idx}
								onClickEvent={() => navToSwipe(ev)}
							/>
						))
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default EventSelect;

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
	eventListContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		paddingBottom: 48,
	},
});
