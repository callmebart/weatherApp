import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

/*Navigation*/
import Navigation from './navigation/Navigation';
import Colors from "./consts/Colors";
import { useEffect } from "react";

export default function App() {

  const setNavigationBarColor = async () => {
    await NavigationBar.setBackgroundColorAsync(Colors.app.darkGrey);
  }

  useEffect(() => {
    setNavigationBarColor()
      .catch(console.error)
  }, [])

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};
