import { TaskObject } from "@/model/TaskObject";
import { useQuery, useRealm } from "@realm/react";

export type ITaskQuery = {
    writeTaskObject: (price: number) => void;
    updateTaskObject: (newPrice: number, newDate: Date, oldTaskObject: TaskObject) => void;
    deleteTaskObject: (TaskObject: TaskObject) => void;
    getTaskObject: () => Realm.Results<TaskObject>;
};

function useTaskObjectQuery(): ITaskQuery {
    const realm = useRealm();
    const task = useQuery(TaskObject);

    function writeTaskObject(price: number) {
        realm.write(() => {
            realm.create("TaskObject", TaskObject.generate(price));
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

    function getTaskObject(): Realm.Results<TaskObject> {
        return task;
    }

    return {
        writeTaskObject,
        updateTaskObject,
        deleteTaskObject,
        getTaskObject,
    };
}

export default useTaskObjectQuery;
