import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Alert
} from "react-native";
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import SwipeableImage from "../components/SwipeableImage";
import BottomBar from "../components/BottomBar";
import SwipeHandle from "../components/SwipeHandle";
import Constants from "expo-constants";
import { app } from "../views/FirebaseInitialize";
import {
	arrayUnion,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore";

const firestore = getFirestore(app);

const Swipe = ({route}) => {
	const event = route.params;
	//list of users and we can manipulate the stack of profiles using users array and the current index
	const [users, setUsers] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [matcher, setMatcher] = useState([])
	const swipeHandleRef = useRef(null)
	//function to fetch dummy users from an api
	async function fetchUsers() {
		try{
			const {data} = await axios.get('https://randomuser.me/api/?results=50&seed=foobar&nat=us')
			setUsers(data.results)
			
		}catch (error) {
			console.log(error)
			Alert.alert('Error fetching users', '', [{text: 'Retry', onPress: () => fetchUsers()}])
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

	useEffect(() => {
		fetchUsers();
		fetchMatcher();
	}, [])
	//Functions that handle operations after liking or disliking someone
	function handleLike() {
		console.log("liked user")
		const user = users[currentIndex].name.first + " " + users[currentIndex].name.last;
		const to_add = {name: user, id: users[currentIndex].login.uuid};
		const match = {name: user, id: users[currentIndex].login.uuid, profileImage: users[currentIndex].picture.thumbnail};
		console.log(user);
		const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
		updateDoc(docRef, {
			likedUsers: arrayUnion(to_add),
		});
		if(matcher.includes(users[currentIndex].login.uuid)){
			updateDoc(docRef, {
				matchedUsers: arrayUnion(match),
			});
		}
		getNextUser()
	}

	function handleDisLike() {
		console.log("dislike user")
		getNextUser()
	}

	function getNextUser(){
		const nextIndex = users.length - 2 === currentIndex ? 0 : currentIndex + 1
		setCurrentIndex(nextIndex)
	}
	//onPress functions
	function handleLikePress(){
		console.log("liked user")
		swipeHandleRef.current.openLeft()
	}

	function handleDislikePress(){
		console.log("dislike user")
		swipeHandleRef.current.openRight()
	}

	return (
		<View style={styles.container}>
			<Text style={styles.welcomeMessageText}>{event.title}</Text>
			<View style={styles.swipes}>
				{users.length > 1 && 
					users.map((u, i) => currentIndex === i && 
					<SwipeHandle 
						ref = {swipeHandleRef} 
						key={i} currentIndex={currentIndex} 
						users={users} handleLike={handleLike} 
						handleDislike={handleDisLike}/>
				)}
			</View>
			<BottomBar handleDislikePress={handleDislikePress} handleLikePress={handleLikePress}/>
		</View>
			
			
	)
};

export default Swipe;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	swipes: {
	  flex: 1,
	  padding: 10,
	  paddingTop: 8,
	  shadowColor: '#000',
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
		marginTop: 10,
		marginBottom: 10,
	},
  })

