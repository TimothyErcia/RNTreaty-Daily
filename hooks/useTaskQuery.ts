import { Task } from "@/model/Task";
import { useQuery, useRealm } from "@realm/react";

export type ITaskQuery = {
    writeTask: (price: Number) => void;
    updateTask: (newPrice: Number, newDate: Date, oldTask: Task) => void;
    deleteTask: (task: Task) => void;
    getTask: () => Realm.Results<Task>;
};

function useTaskQuery(): ITaskQuery {
    const realm = useRealm();
    const task = useQuery(Task);

    function writeTask(price: Number) {
        realm.write(() => {
            realm.create("Task", Task.generate(price));
        });
    }

    function updateTask(newPrice: Number, newDate: Date, oldTask: Task) {
        realm.write(() => {
            oldTask.price = newPrice;
            oldTask.dateAdded = newDate;
        });
    }

    function deleteTask(task: Task) {
        realm.write(() => {
            realm.delete(task);
        });
    }

    function getTask(): Realm.Results<Task> {
        return task;
    }

    return {
        writeTask,
        updateTask,
        deleteTask,
        getTask,
    };
}

export default useTaskQuery;
