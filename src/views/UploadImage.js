import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
// Import the functions you need from the SDKs you need
import { app } from "./FirebaseInitialize";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';

// const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

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
 function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }

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

    let path = "images/profilepic.jpg";
    let imageName = "images/profilepic.jpg";
    let reference = ref(storage, imageName);
    var message = await (await fetch(image_to_add.uri)).blob();
    // uploadString(reference, message, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
    //     console.log('Uploaded a blob or file!');
    //   });
    await uploadBytes(reference, message, {contentType: 'image/jpeg' }).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    // let task = reference.putFile(path);               // 3

    // task.then(() => {                                 // 4
    //     console.log('Image uploaded to the bucket!');
    // }).catch((e) => console.log('uploading image error => ', e));
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
