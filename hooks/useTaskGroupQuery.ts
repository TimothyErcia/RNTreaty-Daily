import { TaskGroupObject } from "@/model/TaskGroupObject";
import { TaskObject } from "@/model/TaskObject";
import { useQuery, useRealm } from "@realm/react";

export type ITaskGroupQuery = {
    writeTaskGroup: (category: string, totalPrice: number, backgroundColor: string, taskList: TaskObject[]) => void;
    deleteTaskGroup: (taskgroup: TaskGroupObject) => void;
    getTaskGroup: () => Realm.Results<TaskGroupObject>;
};

function useTaskGroupQuery(): ITaskGroupQuery {
    const realm = useRealm();
    const taskgroup = useQuery(TaskGroupObject);

    function writeTaskGroup(
        category: string,
        totalPrice: number,
        backgroundColor: string,
        taskList: TaskObject[]
    ) {
        realm.write(() => {
            realm.create(
                "TaskGroupObject",
                TaskGroupObject.generate(
                    category,
                    totalPrice,
                    backgroundColor,
                    taskList
                )
            );
        });
    }

    function deleteTaskGroup(taskgroup: TaskGroupObject) {
        realm.write(() => {
            realm.delete(taskgroup);
        });
    }

    function getTaskGroup(): Realm.Results<TaskGroupObject> {
        return taskgroup;
    }

    return {
        writeTaskGroup,
        deleteTaskGroup,
        getTaskGroup,
    };
}

export default useTaskGroupQuery;
