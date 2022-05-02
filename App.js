import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./src/MainContainer";
import EventDetails from "./src/views/EventDetails";
import Swipe from "./src/views/Swipe";
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#007ae6",
	},
};

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName={"Home"}>
					<Stack.Screen
						options={{ headerShown: false }}
						name={"Home1"}
						component={MainContainer}
					/>
					<Stack.Screen name={"Swipes"} component={Swipe} />
					<Stack.Screen name={"Event Details"} component={EventDetails} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
