import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { getDatabase, ref, onValue, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
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
  const database = getDatabase(app);
  const firestore = getFirestore(app);
// this component serves to contain an invidual event card
const EventCard = ({ event }) => {
	return (
				<Card style={styles.cardContainer}>
					<Card.Content style={styles.cardContent}>
						<Pressable onPress={ () =>{
							const docRef = doc(firestore, 'users', "DdRPo2lJfFbBcqkzAhXz");
							updateDoc(docRef, {
								myEvents: arrayUnion({
								thumbnail: event?.thumbnail,
								start_date: event?.date?.start_date, 
								title: event?.title
								})
							}
							);
							console.log("pressed");
							alert("Event Sucessfully Added!");
						}}>
							<Card.Cover
								style={styles.cardCover}
								source={{ uri: `${event?.thumbnail}` }}
								resizeMode="stretch"
							/>
							<View style={styles.cardTextBackground}>
								<Text style={styles.cardTextLeft}>{event?.date?.start_date}</Text>
								<Text style={styles.cardTextRight}>{event?.title}</Text>
							</View>
						</Pressable>
					</Card.Content>
				</Card>
	);
};

export default EventCard;

const styles = StyleSheet.create({
	cardContainer: {
		marginTop: 20,
		elevation: 8,
		width: "44%",
		aspectRatio: 1,
		borderRadius: 12,
	},
	cardContent: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		paddingTop: 0,
		height: "100%",
		borderRadius: 12,
	},
	cardCover: {
		height: "100%",
		borderRadius: 12,
		zIndex: 1,
	},
	cardTextBackground: {
		borderBottomEndRadius: 12,
		borderBottomStartRadius: 12,
		zIndex: 2,
		backgroundColor: "rgba(241, 236, 235, 0.8)",
		padding: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		height: 40,
		position: "absolute",
		bottom: 0,
		overflow: "hidden",
	},
	cardTextLeft: {
		alignSelf: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
	cardTextRight: {
		alignSelf: "center",
		marginLeft: 8,
		flex: 1,
	},
});
