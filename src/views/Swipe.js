import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Alert,
	Modal,
	Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SwipeableImage from "../components/SwipeableImage";
import BottomBar from "../components/BottomBar";
import SwipeHandle from "../components/SwipeHandle";
import Constants from "expo-constants";
import { app } from "../views/FirebaseInitialize";
import connectOmatch from "../assets/connectOmatch.png";
import { LinearGradient } from "expo-linear-gradient";
import {
	arrayUnion,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { Card, Title} from "react-native-paper";

const firestore = getFirestore(app);

const Swipe = ({ route }) => {
	const event = route.params;
	const match_image = Image.resolveAssetSource(connectOmatch).uri;
	//list of users and we can manipulate the stack of profiles using users array and the current index
	const [users, setUsers] = useState([]);
	const [usersReal, setUsersReal] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [matcher, setMatcher] = useState([]);
	const swipeHandleRef = useRef(null);
	const [modalVisible, setModalVisible] = useState(false);
	//function to fetch dummy users from an api
	async function fetchUsers() {
		try {
			const { data } = await axios.get(
				"https://randomuser.me/api/?results=50&seed=foobar&nat=us"
			);
			setUsers(data.results);
		} catch (error) {
			console.log(error);
			Alert.alert("Error fetching users", "", [
				{ text: "Retry", onPress: () => fetchUsers() },
			]);
		}
	}

	const fetchMatcher = () => {
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					setMatcher(doc.data().matcher);
				} else {
					console.log("No such document");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchFounders = () => {
		const docRef = doc(firestore, "eventAttendees", "y6a3JTOfhBgmYYVXxyZT");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					setUsersReal(doc.data().userList);
				} else {
					console.log("No such document");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchUsers();
		fetchMatcher();
		fetchFounders();
	}, []);
	//Functions that handle operations after liking or disliking someone
	function handleLike() {
		console.log("liked user");
		const user = usersReal[currentIndex].name;
		const match = {
			name: user,
			phone: usersReal[currentIndex].phone,
			profileImage: usersReal[currentIndex].profileImage,
			bio: usersReal[currentIndex].bio,
			age: usersReal[currentIndex].age,
			location: usersReal[currentIndex].location,
		};
		console.log(match);
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		updateDoc(docRef, {
			likedUsers: arrayUnion(match),
		});
		if (matcher.includes(usersReal[currentIndex].phone)) {
			updateDoc(docRef, {
				matchedUsers: arrayUnion(match),
			});

			setModalVisible(true);
		}
		getNextUser();
	}

	function handleDisLike() {
		console.log("dislike user");
		getNextUser();
	}

	function getNextUser() {
		if(currentIndex == usersReal.length - 2){
			setCurrentIndex(0);
		}
		else{
			const nextIndex = currentIndex + 1;
			setCurrentIndex(nextIndex);
		}
	}
	//onPress functions
	function handleLikePress() {
		console.log("liked user");
		swipeHandleRef.current.openLeft();
	}

	function handleDislikePress() {
		console.log("dislike user");
		swipeHandleRef.current.openRight();
	}

	return (
		<LinearGradient style={styles.container} colors={["#064163", "#3ac2d6"]}>
			<Card style={styles.title}>
				<Card.Content>
					<Title style={styles.welcomeMessageText}>Event Title: {event.title} </Title>
				</Card.Content>
			</Card>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<LinearGradient style={styles.modalView} colors={["#e2f0f7", "#fcc3a0"]}>
						<Text style={styles.modalText}>You have a Match!</Text>
						<Image style={styles.matchPopup} source={{ uri: match_image }} />
						<Text style={styles.modalText}>
							Navigate to your matches tab to say hello!
						</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Got It!</Text>
						</Pressable>
					</LinearGradient>
				</View>
			</Modal>

			<View style={styles.swipes}>
				{usersReal.length > 1 &&
					usersReal.map(
						(u, i) =>
							currentIndex === i && (
								<SwipeHandle
									ref={swipeHandleRef}
									key={i}
									currentIndex={currentIndex}
									users={usersReal}
									handleLike={handleLike}
									handleDislike={handleDisLike}
								/>
							)
					)}
			</View>
			<BottomBar
				handleDislikePress={handleDislikePress}
				handleLikePress={handleLikePress}
			/>
		</LinearGradient>
	);
};

export default Swipe;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		margin:10,
		borderRadius: 10,
		backgroundColor:"rgba(0,0,0,0)",
		borderColor:"#f7cc98",
		borderWidth:0,
		
	},
	matchPopup: {
		width: 300,
		height: 250,
	},
	swipes: {
		flex: 1,
		padding: 10,
		paddingTop: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
	},
	welcomeMessageText: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		width: "100%",
		marginTop: 5,
		marginBottom: 5,
		color:"#fcc3a0",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		backgroundColor: "rgba(0,0,0,.3)",
	},
	modalView: {
		margin: 20,
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		width: "50%",
		alignSelf: "center",
		marginTop: 20,
		borderColor: "#415e7c",
		borderWidth: 2,
		borderRadius: 12,
		marginBottom: 24,
	},
	textStyle: {
		color: "#064163",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		color: "#064163",
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		fontSize: 20,
	},
});
