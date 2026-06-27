import { StatusBar } from "expo-status-bar";

import CreateTask from "@/components/pages/CreateTask";
import TaskList from "@/components/pages/TaskList";
import { useTaskStore } from "@/components/states/TaskState";
import Bottom from "@/components/ui/Bottom";
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/Colors";
//import useNotification from "@/hooks/useNotification";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
//import useNotificationQuery from "@/hooks/useNotificationQuery";

export default function Layout() {
  const { updateCategory } = useTaskStore();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isUpdateCategory, setUpdate] = useState(false);
  // const { scheduleNotification } = useNotification();
  //
  // const notifQuery = useNotificationQuery();
  // const hasNotificationSet = notifQuery.hasNotificationSet();
  //
  // useEffect(() => {
  //   if (!hasNotificationSet) {
  //     scheduleNotification();
  //   }
  // }, []);

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
            setUpdate(true);
          }}
        />
        <Bottom
          onAddTaskGroup={() => {
            setIsModalShown(true);
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
