import { Notification } from "@/model/NotificationObject";
import { create } from "zustand";

const initialState: Notification = {
  _id: '',
  hasNotificationSet: false
};

type NotificationState = {
  readonly currentNotification: Notification;
};

type Action = {
  setId: (id: string) => void;
  setNotificationValue: (hasSet: boolean) => void;
};

export type NotificationStore = NotificationState & Action;

export const useNotificationState = create<NotificationState & Action>((set) => ({
  currentNotification: initialState,
  setId: (id: string) =>
    set((state) => ({ currentNotification: { ...state.currentNotification, _id: id } })),
  setNotificationValue: (hasSet: boolean) =>
    set((state) => ({ currentNotification: { ...state.currentNotification, hasNotificationSet: hasSet } })),
}));
