import React, { useContext } from "react";
import { Card } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from "react-native";

// this component serves to contain an invidual event card
const UserCard = ({ user, onClickEvent }) => {
	return (
		<Pressable
			style={styles.outerContainer}
			onPress={() => {
				onClickEvent(user);
			}}
		>
			<Card style={styles.cardContainer}>
				<Card.Content style={styles.cardContent}>
					<Card.Cover
						style={styles.cardCover}
						source={{ uri: `${user?.profileImage}` }}
						resizeMode="cover"
					/>
					<View style={styles.cardTextBackground}>
                        <Text style={styles.cardTextRight}>{user.name}</Text>
					</View>
				</Card.Content>
			</Card>
		</Pressable>
	);
};

export default UserCard;

const styles = StyleSheet.create({
	outerContainer: {
		marginTop: 0,
		elevation: 8,
		width: "60%",
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
		marginLeft: 0,
		flex: 1,
	},
});