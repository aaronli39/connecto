import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, ref, onValue, set } from 'firebase/database';
// Import the functions you need from the SDKs you need
import { app } from "./FirebaseInitialize";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

const database = getDatabase(app);
const firestore = getFirestore(app);

export default function UploadImageList(props)  {
    console.log(props.list_num);
    const docRef = doc(firestore, 'users', "DdRPo2lJfFbBcqkzAhXz");
    getDoc(docRef).then(doc =>{
        if(doc.exists){
            let data = doc.data();
            setImage(data.Images[props.list_num]);

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
<Text>{image ? 'Edit' : 'Upload'} </Text>
<AntDesign name="camera" size={20} color="black" />
</TouchableOpacity>
</View>


</View>

 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height:145,
       width:145,
       marginRight:10,
       backgroundColor:'#efefef',
       position:'relative',
       borderRadius:16,
       overflow:'hidden',
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