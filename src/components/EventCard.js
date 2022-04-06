import React from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";

// this component serves to contain an invidual event card
const EventCard = ({ event }) => {
	return (
		<Card style={styles.cardContainer}>
			<Card.Content style={styles.cardContent}>
				<Card.Cover
					style={styles.cardCover}
					source={{ uri: `${event?.thumbnail}` }}
					resizeMode="stretch"
				/>
				<View style={styles.cardTextBackground}>
					<Text style={styles.cardTextLeft}>{event?.date?.start_date}</Text>
					<Text style={styles.cardTextRight}>{event?.title}</Text>
				</View>
			</Card.Content>
		</Card>
	);
};

export default EventCard;

const styles = StyleSheet.create({
	cardContainer: {
		marginTop: 20,
		elevation: 8,
		width: "44%",
		aspectRatio: 1,
		borderRadius: 12,
	},
	cardContent: {
		paddingHorizontal: 0,
		paddingVertical: 0,
		paddingTop: 0,
		height: "100%",
		borderRadius: 12,
	},
	cardCover: {
		height: "100%",
		borderRadius: 12,
		zIndex: 1,
	},
	cardTextBackground: {
		borderBottomEndRadius: 12,
		borderBottomStartRadius: 12,
		zIndex: 2,
		backgroundColor: "rgba(241, 236, 235, 0.8)",
		padding: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		width: "100%",
		height: 40,
		position: "absolute",
		bottom: 0,
		overflow: "hidden",
	},
	cardTextLeft: {
		alignSelf: "center",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 16,
	},
	cardTextRight: {
		alignSelf: "center",
		marginLeft: 8,
		flex: 1,
	},
});
