import React from "react";
import Constants from "expo-constants";
import Swiper from "react-native-swiper";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import BottomTabImage from "../assets/bottomTabView.jpg";

const Onboarding = ({ navigation }) => {
	return (
		<Swiper style={styles.wrapper} showsButtons loop={false}>
			<ScrollView testID="landing" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>Hello There!</Text>
				<Text style={styles.slideDescription}>
					On the subsequent pages, you can swipe to learn more about how to use
					our app: ConnectO!
				</Text>
				<Text style={styles.slideDescription}>
					If you wish to go straight to the app, press the button below.
				</Text>
				<Button
					mode="outlined"
					color="black"
					style={styles.searchButton}
					onPress={() => navigation.navigate("Home")}
				>
					To the App
				</Button>
			</ScrollView>

			{/* description of pages */}
			<ScrollView testId="explanation" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>Navigation</Text>
				<Image
					source={BottomTabImage}
					style={{ width: "100%", height: 160 }}
					resizeMode="contain"
				/>
				<Text style={styles.slideSubheader}>Tab 1:</Text>
				<Text style={styles.slideDescription}>
					This is the home page tab where you can search for events
				</Text>
				<Text style={styles.slideSubheader}>Tab 2:</Text>
				<Text style={styles.slideDescription}>
					This is the events tab where your events are displayed
				</Text>
				<Text style={styles.slideSubheader}>Tab 3:</Text>
				<Text style={styles.slideDescription}>
					This is the swipe tab where you can start finding friends!
				</Text>
				<Text style={styles.slideSubheader}>Tab 4:</Text>
				<Text style={styles.slideDescription}>
					This is the messages tab where you can see your likes, matches, and
					start connecting!
				</Text>
				<Text style={styles.slideSubheader}>Tab 5:</Text>
				<Text style={styles.slideDescription}>
					This is your profile tab where you can see and edit your pictures and
					information
				</Text>
				<View style={{ height: 240 }}></View>
			</ScrollView>

			{/* home page tab */}
			<ScrollView testID="homePage" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>1: Home Page Tab</Text>
				<Text style={styles.slideDescription}>
					On the home page tab, you can use the search bar to search for an
					event you are attending.
				</Text>
				<Text style={styles.slideDescription}>
					For example, typing "Boston" will show events happening soon in
					Boston!
				</Text>
				<Text style={styles.slideDescription}>
					Once you've found your event, you can click on it to see more details,
					and also add it to your personal event list!
				</Text>
			</ScrollView>

			{/* events tab */}
			<ScrollView testID="eventsPage" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>2: Events Tab</Text>
				<Text style={styles.slideDescription}>
					On this page, you can see your current and pass events!
				</Text>
				<Text style={styles.slideDescription}>
					You can click on any of them to see more details, or also delete the
					event if you wish.
				</Text>
			</ScrollView>

			{/* swipe tab */}
			<ScrollView testID="Swipe" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>3: Swipe Tab</Text>
				<Text style={styles.slideDescription}>
					On this page, you can click on any of your events, and start swiping!
				</Text>
				<Text style={styles.slideDescription}>
					If you see anyone you like, you can click on them to see more info!
				</Text>
				<Text style={styles.slideDescription}>
					If there is a mutual like, then there will be a match and the user
					will show up on your messages.
				</Text>
			</ScrollView>

			{/* messages tab */}
			<ScrollView testID="Swipe" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>4: Messages Tab</Text>
				<Text style={styles.slideDescription}>
					On this page, you can see who you've liked in the "Liked" tab
				</Text>
				<Text style={styles.slideDescription}>
					Likewise, you can see who you've matched with in the "Matched" tab,
					along with their phone number so that you can start chatting!
				</Text>
			</ScrollView>

			{/* profile tab */}
			<ScrollView testID="Swipe" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>5: Profile Tab</Text>
				<Text style={styles.slideDescription}>
					On this page, you can see and change your profile pictures, as well as
					edit your personal information!
				</Text>
				<Text style={styles.slideDescription}>
					If you wish to edit your information, you can directly type it and
					press "Update Profile" to save it.
				</Text>
			</ScrollView>

			{/* done */}
			<ScrollView testID="Swipe" contentContainerStyle={styles.slide1}>
				<Text style={styles.slideHeader}>That's It!</Text>
				<Text style={styles.slideDescription}>
					Feel free to look back on any features and we hope you enjoy using our
					app!
				</Text>
				<Button
					mode="outlined"
					color="black"
					style={styles.searchButton}
					onPress={() => navigation.navigate("Home")}
				>
					Onwards!
				</Button>
			</ScrollView>
		</Swiper>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	wrapper: {
		marginTop: Constants.statusBarHeight,
	},
	slide1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	slideHeader: {
		color: "black",
		fontSize: 36,
		marginTop: Constants.statusBarHeight,
		fontWeight: "bold",
		marginBottom: Constants.statusBarHeight,
	},
	slideSubheader: {
		color: "black",
		fontSize: 24,
		marginTop: Constants.statusBarHeight / 2,
		fontWeight: "bold",
	},
	slideDescription: {
		marginTop: Constants.statusBarHeight / 2,
		fontSize: 16,
		paddingHorizontal: "8%",
		width: "100%",
	},
	slide2Description: {
		marginTop: Constants.statusBarHeight / 2,
		fontSize: 16,
		paddingHorizontal: "8%",
		width: "100%",
	},
	slide3: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#92BBD9",
	},
	searchButton: {
		width: "50%",
		alignSelf: "center",
		marginTop: 120,
		borderColor: "#007ae6",
		borderWidth: 2,
		borderRadius: 12,
	},
});
