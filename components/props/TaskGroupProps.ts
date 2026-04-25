import { Task } from "@/model/TaskObject";

export type TaskGroupProps = {
  task: Task;
  onDeleteTask: () => void;
  onAddPrice: () => void;
  onUpdatePrice: () => void;
};
