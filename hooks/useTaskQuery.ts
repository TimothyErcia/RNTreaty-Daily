import { CATEGORIES } from "@/constants/Categories";
import { Task, TaskObject } from "@/model/TaskObject";
import { useQuery, useRealm } from "@realm/react";

export type TaskQuery = {
  writeTaskObject: (task: Omit<Task, "_id">) => void;
  updateTaskObject: (newPrice: number, task: Task) => void;
  deleteByCategoryTaskObject: (category: string) => void;
  deleteAllTaskObject: () => void;
  deleteById: (id: string) => void;
  getAllTask: () => Task[];
  getTotalSum: () => number;
  getTotalSumByCategory: (category: string) => number;
  getTaskObjectByCategory: (category: string) => Task;
  getHistoryByCategory: (category: string) => Task[];
};

function useTaskQuery(): TaskQuery {
  const realm = useRealm();
  const task = useQuery(TaskObject);

  function writeTaskObject(task: Omit<Task, "_id">) {
    realm.write(() => {
      realm.create("TaskObject", TaskObject.generate(task));
    });
  }

  function updateTaskObject(newPrice: number, task: Task) {
    realm.write(() => {
      const latestTask = realm.objectForPrimaryKey("TaskObject", task._id);
      if (latestTask) {
        latestTask.price = newPrice;
        latestTask.lastPrice = newPrice;
        latestTask.dateAdded = new Date();
      }
    });
  }

  function deleteByCategoryTaskObject(category: string) {
    realm.write(() => {
      const taskById = task.filtered("category = $0", category);
      realm.delete(taskById);
    });
  }

  function deleteAllTaskObject() {
    realm.write(() => {
      realm.deleteAll();
    });
  }

  function getAllTask(): Task[] {
    let outputTask: Task[] = [];
    if (task.length < 1) {
      return [];
    }

    CATEGORIES.forEach((value) => {
      const categoryData = task.filtered("category = $0", value.value);
      const sumOfCategory = categoryData.sum("price");
      if (categoryData && categoryData.length > 0) {
        const latest = categoryData
          .at(categoryData.length - 1)!
          .toJSON() as Task;
        outputTask.push({
          _id: latest._id,
          category: latest.category,
          price: sumOfCategory,
          dateAdded: latest.dateAdded,
          lastPrice: latest.lastPrice,
          backgroundColor: latest.backgroundColor,
        });
      }
    });
    return outputTask;
  }

  function getTotalSum(): number {
    if (task.length < 1) {
      return 0;
    }

    return task.sum("price");
  }

  function getTotalSumByCategory(category: string): number {
    const categoryData = task.filtered("category = $0", category);
    categoryData.at(categoryData.length - 1)!.toJSON() as Task;
    if (categoryData.length < 1) {
      return 0;
    }

    return categoryData.sum("price");
  }

  function getTaskObjectByCategory(category: string): Task {
    const categoryData = task.filtered("category = $0", category);
    return categoryData.at(categoryData.length - 1)!.toJSON() as Task;
  }

  function getHistoryByCategory(category: string): Task[] {
    const categoryData = task.filtered("category = $0", category);
    return categoryData.toJSON() as Task[];
  }

  function deleteById(id: string) {
    realm.write(() => {
      const taskById = realm.objectForPrimaryKey("TaskObject", id);
      realm.delete(taskById);
    });
  }

  return {
    writeTaskObject,
    updateTaskObject,
    deleteByCategoryTaskObject,
    deleteAllTaskObject,
    deleteById,
    getAllTask,
    getTotalSum,
    getTotalSumByCategory,
    getTaskObjectByCategory,
    getHistoryByCategory,
  };
}

export default useTaskQuery;
