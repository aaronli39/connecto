import Constants from "expo-constants";
import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
	Image,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import EventSelect from "./EventSelect";
import PastEvents from "./PastEvents";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "./FirebaseInitialize";

// Initialize Firebase
const firestore = getFirestore(app);

// this component contains the container logic for the Events tab view
const SwipeSelect = ({ navigation }) => {
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [firstname, setFirstname] = React.useState(" ");
	const [lastname, setLastname] = React.useState(" ");
	const [profilePicture, setProfilePicture] = React.useState(" ");

	useEffect(() => {
		// fetch user profile data for events page
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					const userData = doc.data();
					setFirstname(userData.FirstName);
					setLastname(userData.LastName);
					setProfilePicture(userData.ProfileImage);
				} else {
					console.log("No such document");
				}
			})
			.catch((error) => {
				console.log(error);
			});

		// listen for profile picture updates
		const unsub = onSnapshot(
			doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz"),
			(doc) => {
				setProfilePicture(doc.data().ProfileImage);
			},
			(error) => console.log(error)
		);

		// unsubscribe from listener to prevent memory leak
		return () => unsub;
	}, []);

	return (
		// outer view for the tabs
		<View style={{ backgroundColor: "white", height: "100%" }}>
			<View style={styles.profilePictureContainer}>
				<Image
					source={{ uri: profilePicture }}
					style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
				/>
				<Text
					style={styles.profilePictureText}
				>{`${firstname} ${lastname}`}</Text>
			</View>
			<Text style={styles.welcomeMessageText}>
				Select An Event to Start Matching!
			</Text>
			<EventSelect nav={navigation} />
		</View>
	);
};

export default SwipeSelect;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: "4%",
	},
	profilePictureContainer: {
		marginTop: Constants.statusBarHeight / 2,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	profilePictureText: {
		width: "100%",
		textAlign: "center",
		marginTop: Constants.statusBarHeight / 5,
	},
	welcomeMessageText: {
		fontWeight: "bold",
		fontSize: 24,
		textAlign: "center",
		width: "100%",
		marginTop: Constants.statusBarHeight / 2,
		marginBottom: Constants.statusBarHeight / 2,
	},
});
