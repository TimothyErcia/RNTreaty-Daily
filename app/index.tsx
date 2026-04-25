import { StatusBar } from "expo-status-bar";

import CreateTask from "@/components/CreateTask";
import { useTaskStore } from "@/components/states/TaskState";
import TaskList from "@/components/TaskList";
import Bottom from "@/components/ui/Bottom";
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

export default function Layout() {
    const { updateCategory } = useTaskStore();
    const [isModalShown, setIsModalShown] = useState(false);
    const [isUpdateCategory, setUpdate] = useState(false);

    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: Colors.light.background,
                }}
            >
                <Header />
                <TaskList
                    onCategoryAdd={() => {
                        setIsModalShown(true);
                    }}
                    onCetegoryDelete={(value) => {
                        console.log(`${value} has been deleted`);
                    }}
                    onCategoryUpdate={() => {
                        setIsModalShown(true);
                        setUpdate(true)
                    }}
                />
                <Bottom
                    onAddTaskGroup={() => {
                        setIsModalShown(true)
                        updateCategory("");
                    }}
                />
                <CreateTask
                    isVisible={isModalShown}
                    isUpdate={isUpdateCategory}
                    onDismiss={() => {
                        setIsModalShown(false);
                        setUpdate(false);
                    }}
                />
            </SafeAreaView>
        </>
    );
}
