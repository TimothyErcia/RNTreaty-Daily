import * as Notification from "expo-notifications";
import { useEffect } from "react";
import { Platform } from "react-native";

function useNotification() {
  Notification.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: false,
        shouldShowList: false,
      };
    },
  });

  const CHANNEL_ID = "default";

  //Request Permission for Notification
  const requestPermissions = async () => {
    const { status } = await Notification.requestPermissionsAsync();
    if (status !== "granted") {
      await Notification.requestPermissionsAsync();
    }

    if (Platform.OS === "android") {
      await Notification.setNotificationChannelAsync(CHANNEL_ID, {
        name: "default",
        importance: Notification.AndroidImportance.MAX,
      });
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  // Trigger Properties
  const reminderDate = new Date();
  reminderDate.setDate(reminderDate.getDate() + 6);

  const triggerInput: Notification.NotificationTriggerInput = {
    type: Notification.SchedulableTriggerInputTypes.CALENDAR,
    channelId: CHANNEL_ID,
    repeats: false,
    year: reminderDate.getFullYear(),
    month: reminderDate.getMonth() + 1,
    day: reminderDate.getDate(),
    hour: reminderDate.getHours(),
    minute: reminderDate.getMinutes(),
  };

  // Scheduled notification trigger
  const scheduleNotification = async () => {
    await Notification.scheduleNotificationAsync({
      content: {
        title: "Application Expiration",
        body: "Application needs to be renewed by tomorrow",
        data: { data: "goes here" },
      },
      trigger: triggerInput,
    });
  };

  return {
    scheduleNotification,
    requestPermissions,
  };
}

export default useNotification;
