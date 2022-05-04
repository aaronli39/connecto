import React, { useContext } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from "react-native";

// this component serves to contain an invidual event card
const UserCard = ({ user, onClickEvent }) => {
	console.log(user);
	return (
		<Pressable
			style={styles.outerContainer}
			onPress={(e) => e.preventDefault()}
		>
			<Card style={styles.cardContainer}>
				<Card.Content style={styles.cardContent}>
					<Card.Cover
						style={styles.cardCover}
						source={{ uri: `${user?.profileImage}` }}
						resizeMode="cover"
					/>
					<View style={styles.cardTextBackground}>
						<Text>{user.name}</Text>
						<Text>{user.phone}</Text>
					</View>
				</Card.Content>
			</Card>
		</Pressable>
	);
};

export default UserCard;

const styles = StyleSheet.create({
	outerContainer: {
		marginTop: 20,
		elevation: 8,
		width: "44%",
		aspectRatio: 1,
		borderRadius: 12,
	},
	cardContainer: {
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
		width: "100%",
		height: 44,
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
