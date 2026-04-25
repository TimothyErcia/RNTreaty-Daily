import DrawerLayout from "@/components/DrawerLayout";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NotificationObject } from "@/model/NotificationObject";
import { TaskObject } from "@/model/TaskObject";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Layout() {
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
    // function onMigrationCheck(oldRealm: Realm, newRealm: Realm) {
    //     console.log(oldRealm);
    //     console.log(newRealm);
    // }

    function DrawerContent() {
        return <DrawerLayout />
    }

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <GestureHandlerRootView>
                <RealmProvider
                    schema={[NotificationObject, TaskObject]}
                    schemaVersion={1}>
                    {/* onMigration={onMigrationCheck}> */}
                    <Drawer drawerContent={DrawerContent}
                        screenOptions={{
                            headerShown: false,
                            drawerStyle: {
                                width: 275
                            }
                        }}>
                    </Drawer>
                </RealmProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    )
}

export default Layout;