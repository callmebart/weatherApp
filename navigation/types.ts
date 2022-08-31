import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    HomeScreen: undefined;
    ErrorScreen: undefined;
    SettingsScreen: undefined;
    DetailedWeatherScreen: { item: any };
}


export type HomeScreenScreenRouteProp = NativeStackScreenProps<RootStackParamList, "HomeScreen">;
export type DetailsScreenScreenRouteProp = NativeStackScreenProps<RootStackParamList, "SettingsScreen">;
export type ErrorScreenScreenRouteProp = NativeStackScreenProps<RootStackParamList, "ErrorScreen">;
export type DetailedWeatherScreenScreenRouteProp = NativeStackScreenProps<RootStackParamList, "DetailedWeatherScreen">;