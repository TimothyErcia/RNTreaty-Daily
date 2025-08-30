import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import CreateTask from "@/components/CreateTask";
import Bottom from "@/components/ui/Bottom";
import TaskGroup from "@/components/ui/TaskGroup";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TaskGroupObject } from "@/model/TaskGroupObject";
import { TaskObject } from "@/model/TaskObject";
import { RealmProvider } from "@realm/react";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
    const [isModalShown, setIsModalShown] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);

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

    function onDeleteTaskPress() {
        console.log("onDelete Pressed");
    }

    function onAddPricePress() {
        onModalState(true);
    }

    function onAddTaskGroupPress() {
        onModalState(false);
    }

    function onModalState(isCategory: boolean) {
        setIsModalShown(true);
        setIsCategorySelected(isCategory);
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
                {/* <TaskList /> */}
                <TaskGroup
                    category={"Food"}
                    totalPrice={"12,345"}
                    lastUpdateDate={""}
                    lastPrice={"500"}
                    onDeleteTask={onDeleteTaskPress}
                    onAddPrice={onAddPricePress}
                />
                <Bottom
                    totalPrice={"0.00"}
                    onAddTaskGroup={onAddTaskGroupPress}
                />
                <RealmProvider schema={[TaskGroupObject, TaskObject]}>
                    <CreateTask
                        isCategory={isCategorySelected}
                        isVisible={isModalShown}
                        onDismiss={() => {
                            setIsModalShown(false);
                            setIsCategorySelected(false);
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
