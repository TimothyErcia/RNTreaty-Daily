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
import { ACTIONRESPONSE } from "@/components/props/CreateTaskProp";
import ToastView from "@/components/ui/ToastView";
import { useToastStore } from "@/components/states/ToastState";
//import useNotificationQuery from "@/hooks/useNotificationQuery";

export default function Layout() {
  const { updateCategory } = useTaskStore();
  const [isModalShown, setIsModalShown] = useState(false);
  const [isUpdateCategory, setUpdate] = useState(false);
  const toastStore = useToastStore();
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
          onCategoryAction={(isUpdate) => {
            setIsModalShown(true);
            setUpdate(isUpdate);
          }}
          onDeleteResponse={(response: string) => {
            // Toast Message for Delete
            toastStore.setToast({
              message: response,
              type: ACTIONRESPONSE.DELETED,
              didAnimationEnd: false,
            });
          }}
        />
        <Bottom
          onAddTaskGroup={() => {
            setIsModalShown(!isModalShown);
            updateCategory("");
          }}
        />
        <CreateTask
          isVisible={isModalShown}
          isUpdate={isUpdateCategory}
          onDismiss={(actionResponse: ACTIONRESPONSE) => {
            setIsModalShown(false);
            setUpdate(false);

            // Toast Message
            if (actionResponse === ACTIONRESPONSE.CREATED) {
              toastStore.setToast({
                message: "Successfully created",
                type: actionResponse,
                didAnimationEnd: false,
              });
            } else if (actionResponse === ACTIONRESPONSE.UPDATED) {
              toastStore.setToast({
                message: "Successfully updated",
                type: actionResponse,
                didAnimationEnd: false,
              });
            } else if (actionResponse === ACTIONRESPONSE.ERROR) {
              toastStore.setToast({
                message: "Internal Error",
                type: actionResponse,
                didAnimationEnd: false,
              });
            }
          }}
        />
        {!toastStore.currentToast.didAnimationEnd && <ToastView />}
      </SafeAreaView>
    </>
  );
}
