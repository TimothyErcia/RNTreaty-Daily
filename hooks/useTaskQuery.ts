import { CATEGORIES } from "@/constants/Categories";
import { Task, TaskObject } from "@/model/TaskObject";
import { useQuery, useRealm } from "@realm/react";

export type ITaskQuery = {
    writeTaskObject: (task: Omit<Task, '_id'>) => void;
    updateTaskObject: (newPrice: number, newDate: Date, oldTaskObject: TaskObject) => void;
    deleteTaskObject: (TaskObject: TaskObject) => void;
    getAllTaskByCategory: () => Task[];
    getTotalSum: () => number;
};

function useTaskObjectQuery(): ITaskQuery {
    const realm = useRealm();
    const task = useQuery(TaskObject);

    function writeTaskObject(task: Omit<Task, '_id'>) {
        realm.write(() => {
            realm.create("TaskObject", TaskObject.generate(task));
        });
    }

    function updateTaskObject(newPrice: number, newDate: Date, oldTaskObject: TaskObject) {
        realm.write(() => {
            oldTaskObject.price = newPrice;
            oldTaskObject.dateAdded = newDate;
        });
    }

    function deleteTaskObject(TaskObject: TaskObject) {
        realm.write(() => {
            realm.delete(TaskObject);
        });
    }

    function getAllTaskByCategory(): Task[] {
        let outputTask: Task[] = [];
        if(task.length < 1) {
            return [];
        }

        CATEGORIES.forEach((value) => {
            const categoryData = task.filtered('category = $0', value.value);
            const sumOfCategory = categoryData.sum('price');
            if(categoryData && categoryData.length > 0) {
                const latest = categoryData[categoryData.length-1];
                outputTask.push({
                    _id: latest._id,
                    category: latest.category,
                    price: sumOfCategory,
                    dateAdded: latest.dateAdded,
                    lastPrice: latest.lastPrice,
                    backgroundColor: latest.backgroundColor
                });
            }
        });
        return outputTask;
    }

    function getTotalSum(): number {
        if(task.length < 1) {
            return 0;
        }

        return task.sum('price');
    }

    return {
        writeTaskObject,
        updateTaskObject,
        deleteTaskObject,
        getAllTaskByCategory,
        getTotalSum
    };
}

export default useTaskObjectQuery;
