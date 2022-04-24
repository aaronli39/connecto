import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// Import the functions you need from the SDKs you need
import { app } from "./FirebaseInitialize";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

// const database = getDatabase(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export default function UploadImage() {
  const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");
  getDoc(docRef)
    .then((doc) => {
      if (doc.exists) {
        console.log("Document Data:", doc.data().FirstName);
        let data = doc.data();
        setImage(data.ProfileImage);
      } else {
        console.log("No such document");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const [image, setImage] = useState(null);

  const addImage = async () => {
    let image_to_add = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let imageName = "images/profilepic.jpg";
    let reference = ref(storage, imageName);
    var message = await (await fetch(image_to_add.uri)).blob();

    await uploadBytes(reference, message, { contentType: "image/jpeg" }).then(
      (snapshot) => {
        console.log("Uploaded a blob or file!");
        setImage(image_to_add.uri);
      }
    );
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 7,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
