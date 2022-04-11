import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import EventCard from "../components/EventCard";
import { CONSTANTS } from "../constants/DataConstants";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { CONFIGS } from "../constants/config.js"

const firebaseConfig = {
	apiKey: CONFIGS.FIRE_BASE_API,
	authDomain: "xc475-connecto.firebaseapp.com",
	projectId: "xc475-connecto",
	storageBucket: "xc475-connecto.appspot.com",
	messagingSenderId: "473690460289",
	appId: "1:473690460289:web:86a6549aa86764b41b7d80",
	measurementId: "G-RNJ8PM5ZVK"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

const CurrentEvents = () => {
	const [eventsList, setEventsList] = useState([]);

	// REMOVE CODE POINT #1
	// TEMPORARY DUMMY DATA, REMOVE AFTER
	// FETCH FROM FIRESTORE WORKS
	const fetchMyEventList = () => {
		console.log("fetching now...");
		const docRef = doc(firestore, 'users', "DdRPo2lJfFbBcqkzAhXz");
		getDoc(docRef).then(doc =>{
			if(doc.exists){
				console.log("Document Data:" , doc.data().myEvents);
				setEventsList(doc.data().myEvents);
				console.log("eventsList: ", eventsList);
				}
			else{
				console.log("No such document");
			}
		})
		.catch(error => {
			console.log(error);
		})
	};

	useEffect(async () => {
		// REMOVE CODE POINT #2
		// put firebase fetching code here and then
		// use setEventsList(<firebase data>) (it should be a list),
		// REMOVE this following line
		console.log("fetching....");
		fetchMyEventList();
	}, [eventsList]);

	return (
		// outer view to encompass entire page
		<View style={{ backgroundColor: "white", height: "100%" }}>
			{/* Flatlist renders all the events, and the header component is all the 
        ui components before that  */}
			<FlatList
				ListHeaderComponent={
					<ScrollView
						style={styles.container}
						keyboardShouldPersistTaps="handled"
						alignContent="center"
					></ScrollView>
				}
				columnWrapperStyle={{ justifyContent: "space-around" }}
				data={eventsList}
				numColumns={2}
				keyExtractor={(event, idx) => idx}
				renderItem={(ev) => <EventCard event={ev.item} />}
				ListFooterComponent={<View style={{ height: 24 }}></View>}
			/>
		</View>
	);
};

export default CurrentEvents;

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
});
