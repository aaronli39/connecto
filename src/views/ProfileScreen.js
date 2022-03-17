import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

// THIS IS JUST A TEST FILE FOR NAVIGATION, PLEASE DELETE OR REPLACE THIS COMPONENT!
const ProfileScreen = ({ navigation }) => {
	return (
		<View style={{ marginTop: 100 }}>
			<Text>Hello this is profile page</Text>
			<Button
				mode="contained"
				style={{ width: "50%", alignSelf: "center", marginTop: 10 }}
				onPress={() => navigation.navigate("Home")}
			>
				Back to home
			</Button>
		</View>
	);
};

export default ProfileScreen;
