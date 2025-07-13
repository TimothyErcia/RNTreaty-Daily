import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TaskList from "./TaskList";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        inter: require("../assets/fonts/inter.ttf"),
        kufam_italic: require("../assets/fonts/kufam_italic.ttf"),
        kufam_regular: require("../assets/fonts/kufam_regular.ttf"),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <StatusBar style="auto" />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer />
            </GestureHandlerRootView>
            <TaskList />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({});
