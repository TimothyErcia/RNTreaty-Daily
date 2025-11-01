import DrawerLayout from "@/components/DrawerLayout";
import { NotificationObject } from "@/model/NotificationObject";
import { TaskObject } from "@/model/TaskObject";
import { RealmProvider } from "@realm/react";
import { Drawer } from "expo-router/drawer";
import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Layout() {
    function DrawerContent() {
        return <DrawerLayout />
    }

    return (
        <GestureHandlerRootView>
            <RealmProvider schema={[NotificationObject, TaskObject]}>
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
    )
}

export default Layout;