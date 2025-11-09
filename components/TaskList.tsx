import useTaskObjectQuery, { ITaskQuery } from "@/hooks/useTaskQuery";
import { Task } from "@/model/TaskObject";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { TaskListProps } from "./props/TaskListProps";
import TaskGroup from "./ui/TaskGroup";

function TaskList(props: TaskListProps) {
    const realmTask: ITaskQuery = useTaskObjectQuery();

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
        <View>
            <FlatList
                data={tasklist}
                renderItem={({ item }) => (
                    <View style={{ height: 138 }}>
                        <TaskGroup
                            category={item.category}
                            totalPrice={item.price.toString()}
                            lastUpdateDate={item.dateAdded.toDateString()}
                            lastPrice={item.lastPrice.toString()}
                            backgroundColor={item.backgroundColor}
                            onDeleteTask={() => {
                                props.onCetegoryDelete(item.category);
                                realmTask.deleteByCategoryTaskObject(item.category)
                            }}
                            onAddPrice={() => {
                                props.onCategoryAdd(item.category);
                            }}
                            onUpdatePrice={() => {
                                props.onCategoryUpdate(item.category);
                            }}
                        ></TaskGroup>
                    </View>
                )}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

export default TaskList;
