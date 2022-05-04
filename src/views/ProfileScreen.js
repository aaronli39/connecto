import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Button, useTheme, withTheme } from "react-native-paper";
import Constants from "expo-constants";
import axios from "axios";
import UploadImage from "./UploadImage";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import UploadImageList from "./UploadImageList";
import { getDatabase, ref, onValue, set } from "firebase/database";
// Import the functions you need from the SDKs you need
import { app } from "./FirebaseInitialize";
import {
  getFirestore,
  updateDoc,
  doc,
  collection,
  getDocs,
  getDoc,
  DocumentSnapshot,
} from "firebase/firestore";

// THIS IS JUST A TEST FILE FOR NAVIGATION, PLEASE DELETE OR REPLACE THIS COMPONENT!
const ProfileScreen = ({ navigation }) => {
  // Initialize Firebase
  const firestore = getFirestore(app);

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  //Collection Ref
  const docRef = doc(firestore, "users", "DdRPo2lJfFbBcqkzAhXz");

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists) {
          console.log("Document Data:", doc.data().FirstName);
          let data = doc.data();
          setName(data.FirstName + " " + data.LastName);
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setBio(data.Biography);
          setPhone(data.Phone);
          setEmail(data.Email);
          setCountry(data.Country);
          setCity(data.City);
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { width } = Dimensions.get("window");
  const SPACING = 10;
  const THUMB_SIZE = 80;
  const DATA = [
    { image: <UploadImageList list_num={0} />, id: "1" },
    { image: <UploadImageList list_num={1} />, id: "2" },
    { image: <UploadImageList list_num={2} />, id: "3" },
    { image: <UploadImageList list_num={3} />, id: "4" },
    { image: <UploadImageList list_num={4} />, id: "5" },
    { image: <UploadImageList list_num={5} />, id: "6" },
  ];
  const { colors } = useTheme();

  const sumbitProfile = async () => {
    var words = name.split(" ");
    var firstName1 = "";
    var lastName1 = "";
    if (words.length > 0) {
      firstName1 = words[0];
    }
    if (words.length > 1) {
      lastName1 = words[1];
    }

    setFirstName(firstName1);
    console.log(
      "Submit",
      firstName1,
      lastName1,
      bio,
      phone,
      email,
      country,
      city
    );

    const docData = {
      "FirstName": firstName1,
      "LastName": lastName1,
      "Biography": bio,
      "Phone": phone,
	  "Email": email,
      "Country": country,
      "City": city,
    };
    console.log(docData);
    await updateDoc(docRef, docData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        marginTop: 50,
        paddingBottom: 60,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UploadImage style={{ alignSelf: "center"}} />
      <Text style={{ fontSize: 15, marginRight: "35%", marginBottom: 40, }}>
        <Text>{firstName}, </Text>
        <Text style={{fontWeight: "bold"}}>26</Text>
      </Text>

      <FlatList
        horizontal={true}
        data={DATA}
        style={{ marginTop: "0%", marginBottom: "5%" }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity activeOpacity={0.9}>
            <UploadImageList
              list_num={index}
              style={{
                width: THUMB_SIZE,
                height: THUMB_SIZE,
                marginRight: SPACING,
                borderRadius: 16,
              }}
            />
          </TouchableOpacity>
        )}
      />

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        NAME
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          value={name}
          onChangeText={setName}
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

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        ABOUT ME
      </Text>
      <View style={styles.action}>
        <Feather name="info" color={colors.text} size={20} />
        <TextInput
          value={bio}
          onChangeText={setBio}
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

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        PHONE NUMBER
      </Text>
      <View style={styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          value={phone}
          onChangeText={setPhone}
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

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        SCHOOL
      </Text>     
      <View style={styles.action}>
        <Icon name="school" color={colors.text} size={20} />
        <TextInput
          value={email}
          onChangeText={setEmail}
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

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        JOB TITLE
      </Text>  
      <View style={styles.action}>
        <Icon name="shoe-formal" color={colors.text} size={20} />
        <TextInput
          value={country}
          onChangeText={setCountry}
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

      <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
        City
      </Text>  
      <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />
        <TextInput
          value={city}
          onChangeText={setCity}
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

      <TouchableOpacity
        style={styles.commandButton}
        onPress={() => sumbitProfile()}
      >
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
    backgroundColor: "#f5a721",
    alignItems: "center",
    marginTop: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#A9F5FF",
    paddingBottom: 5,
  },
  textInput: {
    flex: 2,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    marginLeft: 20,
    marginRight: 20,
    color: "black",
    backgroundColor: "#ECECEC",
    borderRadius: 3
  },
});
