import { Task } from "@/model/Task";
import { TaskGroup } from "@/model/TaskGroup";
import { useQuery, useRealm } from "@realm/react";

function useTaskGroupQuery() {
    const realm = useRealm();
    const taskgroup = useQuery(TaskGroup);

    function writeTaskGroup(
        category: string,
        totalPrice: Number,
        backgroundColor: string,
        taskList: Task[]
    ) {
        realm.write(() => {
            realm.create(
                "TaskGroup",
                TaskGroup.generate(
                    category,
                    totalPrice,
                    backgroundColor,
                    taskList
                )
            );
        });
    }

    function deleteTaskGroup(taskgroup: TaskGroup) {
        realm.write(() => {
            realm.delete(taskgroup);
        });
    }

    function getTaskGroup() {
        return taskgroup;
    }
}

export default useTaskGroupQuery;
