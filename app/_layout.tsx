import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import CreateTask from "@/components/CreateTask";
import TaskList from "@/components/TaskList";
import Bottom from "@/components/ui/Bottom";
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TaskObject } from "@/model/TaskObject";
import { RealmProvider } from "@realm/react";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
    const [isModalShown, setIsModalShown] = useState(false);
    const [selectedCategoryVal, setCategoryVal] = useState('');

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

    function onAddTaskGroupPress() {
        setCategoryVal('');
        onModalState();
    }

    function onModalState() {
        setIsModalShown(true);
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Colors.light.background,
                }}
            >
                <RealmProvider schema={[TaskObject]}>
                    <Header onDeleteAll={(value) => {
                        console.log(value);
                    }} />
                    <TaskList
                        onCategoryAdd={(value) => {
                            setCategoryVal(value)
                            onModalState();
                        }}
                        onCetegoryDelete={(value) => {
                            console.log(`${value} has been deleted`);
                        }}
                    />
                    <Bottom
                        onAddTaskGroup={onAddTaskGroupPress}
                    />
                    <CreateTask
                        selectedCategory={selectedCategoryVal}
                        isVisible={isModalShown}
                        onDismiss={() => {
                            setIsModalShown(false);
                        }}
                    />
                </RealmProvider>
            </SafeAreaView>
            {/* <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer />
            </GestureHandlerRootView> */}
        </ThemeProvider>
    );
}
