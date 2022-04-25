import React from "react";
import { Text, View } from "react-native";

// this component contains the view for the past events
const PastEvents = () => {
	// TODO: add state + useEffect hooks here in order
	// to fetch some dummy events that have "passed" from
	// firestore and display it here. Follow the code i used in
	// CurrentEvents.js to display the events and render it

	return (
		<View style={{ marginTop: 100 }}>
			<Text style={{ textAlign: "center" }}>No matched users</Text>
		</View>
	);
};

export default PastEvents;
