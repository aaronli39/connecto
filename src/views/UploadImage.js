import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
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




export default function UploadImage() {
    const docRef = doc(firestore, 'users', "DdRPo2lJfFbBcqkzAhXz");
	getDoc(docRef).then(doc =>{
		if(doc.exists){
			console.log("Document Data:" , doc.data().FirstName);
			let data = doc.data();
			setImage(data.ProfileImage);

			}
		else{
			console.log("No such document");
		}
	})
	.catch(error => {
		console.log(error);
	})
 const [image, setImage] = useState(null);
 const addImage= async ()=>{
    let image_to_add = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
    });
    
    if(!image_to_add.cancelled){
        setImage(image_to_add.uri);
    }
 };
    
 return (
<View style={imageUploaderStyles.container}>
               {
                   image  &&<Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
               }

<View style={imageUploaderStyles.uploadBtnContainer}>
<TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
<Text>{image ? 'Edit' : 'Upload'} Image</Text>
<AntDesign name="camera" size={20} color="black" />
</TouchableOpacity>
</View>


</View>

 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height:200,
       width:200,
       backgroundColor:'#efefef',
       position:'relative',
       borderRadius:25,
       overflow:'hidden',
       marginTop:50,
       marginBottom:50
   },
   uploadBtnContainer:{
       opacity:0.7,
       position:'absolute',
       right:0,
       bottom:0,
       backgroundColor:'lightgrey',
       width:'100%',
       height:'25%',
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center'
   }
})
