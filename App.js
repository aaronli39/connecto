import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventSearch from "./src/views/EventSearch";
import ProfileScreen from "./src/views/ProfileScreen";
import MainContainer from './src/MainContainer';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#03c2fc",
  }
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <MainContainer/>
    </PaperProvider>
  );
}
