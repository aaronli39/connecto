import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const EventCard = ({ event }) => {
	const { colors } = useTheme();

	const styles = StyleSheet.create({
		cardContainer: {
			marginTop: 20,
			borderRadius: 10,
			elevation: 8,
			borderColor: colors.primary,
			borderStyle: "solid",
			borderWidth: 1,
			width: "70%",
			flex: 1,
			alignSelf: "center",
		},
		cardContent: {
			paddingHorizontal: 0,
			paddingVertical: 0,
			overflow: "hidden",
		},
		cardCover: {
			alignSelf: "center",
			width: "90%",
			backgroundColor: "white",
		},
		cardTextBackground: {
			backgroundColor: "lightgray",
			borderBottomLeftRadius: 9,
			borderBottomRightRadius: 9,
			padding: 10,
			display: "flex",
			flexDirection: "row",
			width: "100%",
		},
		cardTextRightFlex: {
			width: "80%",
			display: "flex",
			flexDirection: "column",
			marginVertical: 2,
			justifyContent: "flex-end",
			paddingLeft: 10,
			paddingBottom: 5,
		},
	});
	return (
		<Card style={styles.cardContainer}>
			<Card.Content style={styles.cardContent}>
				<Card.Cover
					style={styles.cardCover}
					source={{ uri: `${event?.thumbnail}` }}
					resizeMode="contain"
				/>
				<View style={styles.cardTextBackground}>
					<Title
						style={{ width: "20%", alignSelf: "center", textAlign: "center" }}
					>
						{event?.date?.start_date}
					</Title>
					<View style={styles.cardTextRightFlex}>
						<Text style={{ fontWeight: "bold" }} numberOfLines={1}>
							{event?.title}
						</Text>
						<Text numberOfLines={1}>{event?.venue?.name}</Text>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
};

export default EventCard;
