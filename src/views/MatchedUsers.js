import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";
import EventCard from "../components/EventCard";
import UserCard from "../components/UserCard";
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
// this component contains the view for the past events
const MatchedUsers = () => {
	const [userList, setUserList] = useState([]);

	// on page load, fetch all user's events
	useEffect(async () => {
		fetchMatchList();

		const unsub = onSnapshot(
			doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz"),
			(doc) => {
				setUserList(doc.data().matchedUsers);
			},
			(error) => console.log(error)
		);

		return () => unsub;
	}, []);

	// fetch user John Doe's events
	const fetchMatchList = () => {
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					setUserList(doc.data().matchedUsers);
				} else {
					console.log("No such document");
				}
			})
			.catch((error) => {
				console.log(error);
			});
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
					{userList?.length === 0 ? (
						<View style={{ marginTop: 100 }}>
							<Text style={{ textAlign: "center" }}>You have no Matches!</Text>
						</View>
					) : (
						userList?.map((ev, idx) => (
							<UserCard user={ev} key={idx} renderPhone={true}></UserCard>
						))
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default MatchedUsers;

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
