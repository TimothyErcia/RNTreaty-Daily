import DrawerLayout from "@/components/DrawerLayout";
import { Drawer } from "expo-router/drawer";
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Layout() {
    function DrawerContent() {
        return <DrawerLayout />
    }

    return (
        <GestureHandlerRootView>
            <Drawer drawerContent={DrawerContent} screenOptions={{
                headerShown: false,
            }}>
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default Layout;