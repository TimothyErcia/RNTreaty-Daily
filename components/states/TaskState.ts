import { Task } from "@/model/TaskObject";
import { create } from "zustand";

const initialTasks: Task = {
  _id: "",
  price: 0,
  category: "",
  dateAdded: new Date(),
  lastPrice: 0,
  backgroundColor: "",
};

type Action = {
  setCurrentTask: (task: Task) => void;
  updatePrice: (price: number) => void;
  updateCategory: (category: string) => void;
  updateBackgroundColor: (color: string) => void;
  updateLastPrice: (price: number) => void;
  updateDateAdded: (date: Date) => void;
  updateId: (id: string) => void;
  resetCurrentTask: () => void;
};

type TaskState = {
  readonly currentTask: Task;
};

export type TaskStore = TaskState & Action;

export const useTaskStore = create<TaskState & Action>((set) => ({
  currentTask: initialTasks,
  setCurrentTask: (task: Task) => set({ currentTask: task }),
  updateId: (id: string) =>
    set((state) => ({ currentTask: { ...state.currentTask, _id: id } })),
  updatePrice: (price: number) =>
    set((state) => ({ currentTask: { ...state.currentTask, price } })),
  updateCategory: (category: string) =>
    set((state) => ({ currentTask: { ...state.currentTask, category } })),
  updateBackgroundColor: (color: string) =>
    set((state) => ({
      currentTask: { ...state.currentTask, backgroundColor: color },
    })),
  updateLastPrice: (price: number) =>
    set((state) => ({
      currentTask: { ...state.currentTask, lastPrice: price },
    })),
  updateDateAdded: (date: Date) =>
    set((state) => ({
      currentTask: { ...state.currentTask, dateAdded: date },
    })),
  resetCurrentTask: () => set({ currentTask: initialTasks }),
}));
