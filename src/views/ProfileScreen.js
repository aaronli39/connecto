import React from "react";
import { View, ScrollView, Text , TouchableOpacity, ImageBackground, TextInput, StyleSheet, FlatList,
	Dimensions} from "react-native";
import { Button, useTheme, withTheme } from "react-native-paper";
import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import UploadImage from './UploadImage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import UploadImageList from "./UploadImageList";
import { getDatabase, ref, onValue, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, collection, getDocs, getDoc, DocumentSnapshot} from 'firebase/firestore';
import { CONFIGS } from "../constants/config.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: CONFIGS.FIRE_BASE_API,
  authDomain: "xc475-connecto.firebaseapp.com",
  projectId: "xc475-connecto",
  storageBucket: "xc475-connecto.appspot.com",
  messagingSenderId: "473690460289",
  appId: "1:473690460289:web:86a6549aa86764b41b7d80",
  measurementId: "G-RNJ8PM5ZVK"
};

	


// THIS IS JUST A TEST FILE FOR NAVIGATION, PLEASE DELETE OR REPLACE THIS COMPONENT!
const ProfileScreen = ({ navigation }) => {
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [profile, setProfile] = useState("");
	//Collection Ref
	const docRef = doc(firestore, 'users', "DdRPo2lJfFbBcqkzAhXz");
	getDoc(docRef).then(doc =>{
		if(doc.exists){
			console.log("Document Data:" , doc.data().FirstName);
			let data = doc.data();
			setFirstName(data.FirstName);
			setLastName(data.LastName);
			setBio(data.Biography);
			setPhone(data.Phone);
			setEmail(data.Email);
			setCountry(data.Country);
			setCity(data.City);

			}
		else{
			console.log("No such document");
		}
	})
	.catch(error => {
		console.log(error);
	})
	//const biography = profileData.getString("Biography");
	//const city = profileData.getString("City");
	//const country = document.getString("Country");
	//const first = profileData.getString("FirstName");
	//const last = profileData.getString("LastName");
	//const phone = document.getString("Phone");
	//const profileImage = document.getString("ProfileImage");
	const { width } = Dimensions.get('window');
	const SPACING = 10;
	const THUMB_SIZE = 80;
	const DATA = [
		{image: <UploadImageList list_num={0}/>, id: "1"},
		{image: <UploadImageList list_num={1}/>, id: "2"},
		{image: <UploadImageList list_num={2}/>, id: "3"},
		{image: <UploadImageList list_num={3}/>, id: "4"},
		{image: <UploadImageList list_num={4}/>, id: "5"},
		{image: <UploadImageList list_num={5}/>, id: "6"},
	]
	const { colors } = useTheme();
	return (
		
		<ScrollView style={styles.container} contentContainerStyle={{marginTop: 50, paddingBottom: 60, marginLeft: 10, marginRight:10 , justifyContent: "center",  alignItems: "center"}}>
			<Text style={{alignSelf:"center" , fontWeight:"bold"}}>Hello, {firstName} {lastName}!</Text>
			<UploadImage style={{alignSelf: "center"}}/>
			<View style={styles.action}>
				<Feather name="info" color={colors.text} size={20} /> 
				<TextInput
				placeholder={bio}
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
					styles.textInput,
					{
					color: colors.text,
					},
				]}
				/>
			</View>
			<View style={styles.action}>
				<FontAwesome name="user-o" color={colors.text} size={20} />
				<TextInput
				placeholder={firstName + " " + lastName}
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
					styles.textInput,
					{
					color: colors.text,
					},
				]}
				/>
			</View>
			
			<View style={styles.action}>
			<Feather name="phone" color={colors.text} size={20} />
			<TextInput
				placeholder={phone}
				placeholderTextColor="#666666"
				keyboardType="number-pad"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<FontAwesome name="envelope-o" color={colors.text} size={20} />
			<TextInput
				placeholder={email}
				placeholderTextColor="#666666"
				keyboardType="email-address"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<FontAwesome name="globe" color={colors.text} size={20} />
			<TextInput
				placeholder={country}
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>
			<View style={styles.action}>
			<Icon name="map-marker-outline" color={colors.text} size={20} />
			<TextInput
				placeholder={city}
				placeholderTextColor="#666666"
				autoCorrect={false}
				style={[
				styles.textInput,
				{
					color: colors.text,
				},
				]}
			/>
			</View>

			<FlatList
				horizontal={true}
				data={DATA}
				style={{marginTop:"5%", marginBottom: "5%"}}
				
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: SPACING
				}}
				keyExtractor={item => item.id}
				renderItem={({ item, index }) => (
					<TouchableOpacity activeOpacity={0.9}>
					<UploadImageList
						list_num = {index}
						style={{
						width: THUMB_SIZE,
						height: THUMB_SIZE,
						marginRight: SPACING,
						borderRadius: 16,
						//borderWidth: index === indexSelected ? 4 : 0.75,
						//borderColor: index === indexSelected ? 'orange' : 'white'
						}}
					/>
					</TouchableOpacity>
				)}
				/>

			<TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          		<Text style={styles.panelButtonTitle}>Update Profile</Text>
        	</TouchableOpacity>
		</ScrollView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: "0%",
	},

	commandButton: {
	  padding: 15,
	  borderRadius: 10,
	  backgroundColor: 'blue',
	  alignItems: 'center',
	  marginTop: 10,
	},
	
	
	panelButtonTitle: {
	  fontSize: 17,
	  fontWeight: 'bold',
	  color: 'white',
	},
	action: {
	  flexDirection: 'row',
	  marginTop: 10,
	  marginBottom: 10,
	  paddingVertical: 10,
	  backgroundColor:"white"
	},
	actionError: {
	  flexDirection: 'row',
	  marginTop: 10,
	  borderBottomWidth: 1,
	  borderBottomColor: '#A9F5FF',
	  paddingBottom: 5,
	},
	textInput: {
	  flex:2,
	  marginTop: Platform.OS === 'ios' ? 0 : -12,
	  marginLeft: 20,
	  marginRight: 20,
	  color: 'black',
	  backgroundColor:'white'
	},
  });
