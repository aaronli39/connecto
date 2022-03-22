import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImageList() {
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