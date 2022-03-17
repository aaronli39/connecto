import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import EventSearch from "./src/views/EventSearch";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#03c2fc",
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar style="auto" />
      <EventSearch />
    </PaperProvider>
  );
}
