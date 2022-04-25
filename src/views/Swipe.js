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

export default function Swipe() {
	//list of users and we can manipulate the stack of profiles using users array and the current index
	const [users, setUsers] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const swipeHandleRef = useRef(null)
	//function to fetch dummy users from an api
	async function fetchUsers() {
		try{
			const {data} = await axios.get('https://randomuser.me/api/?results=50')
			setUsers(data.results)
			
		}catch (error) {
			console.log(error)
			Alert.alert('Error fetching users', '', [{text: 'Retry', onPress: () => fetchUsers()}])
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])
	//Functions that handle operations after liking or disliking someone
	function handleLike() {
		console.log("liked user")
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
}

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
  })

