import useTaskObjectQuery, { TaskQuery } from "@/hooks/useTaskQuery";
import { Task } from "@/model/TaskObject";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { TaskListProps } from "./props/TaskListProps";
import { useTaskStore } from "./states/TaskState";
import TaskGroup from "./ui/TaskGroup";

function TaskList(props: TaskListProps) {
    const { setCurrentTask } = useTaskStore();
    const realmTask: TaskQuery = useTaskObjectQuery();

    // Use the data directly if it's reactive
    const tasklist: Task[] = useMemo(() => {
        try {
            return realmTask.getAllTask();
        } catch (error) {
            console.error('Error getting tasks:', error);
            return [];
        }
    }, [realmTask]);

    return (
        <View style={{ height: '85%' }}>
            <FlatList
                data={tasklist}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ height: 138 }}>
                        <TaskGroup
                            task={item}
                            onDeleteTask={() => {
                                props.onCetegoryDelete(item.category);
                                realmTask.deleteByCategoryTaskObject(item.category);
                            }}
                            onAddPrice={() => {
                                props.onCategoryAdd();
                                setCurrentTask(item);
                            }}
                            onUpdatePrice={() => {
                                props.onCategoryUpdate();
                                setCurrentTask(item);
                            }}
                        ></TaskGroup>
                    </View>
                )}
            />
        </View>
    );
}

export default TaskList
