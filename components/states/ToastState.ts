import { create } from "zustand";
import { ACTIONRESPONSE } from "../props/CreateTaskProp";

type Toast = {
  type: ACTIONRESPONSE;
  message: string;
  didAnimationEnd: boolean;
};

const initialToastState: Toast = {
  type: ACTIONRESPONSE.UNDEFINED,
  message: "",
  didAnimationEnd: false,
};

type Action = {
  setToast: (toast: Toast) => void;
  updateType: (type: ACTIONRESPONSE) => void;
  updateMessage: (message: string) => void;
  updateAnimationEnd: (didEnd: boolean) => void;
};

type ToastState = {
  readonly currentToast: Toast;
};

export type ToastStore = Action & ToastState;

export const useToastStore = create<ToastStore>((set) => ({
  currentToast: initialToastState,
  setToast: (toast: Toast) => set({ currentToast: toast }),
  updateType: (newType: ACTIONRESPONSE) =>
    set((state) => ({ currentToast: { ...state.currentToast, type: newType } })),
  updateMessage: (newMessage: string) =>
    set((state) => ({ currentToast: { ...state.currentToast, message: newMessage } })),
  updateAnimationEnd: (_didEnd: boolean) =>
    set((state) => ({ currentToast: { ...state.currentToast, didAnimationEnd: _didEnd } })),
}));
