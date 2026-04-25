import { CATEGORIES } from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import useTaskQuery, { TaskQuery } from "@/hooks/useTaskQuery";
import { Task } from "@/model/TaskObject";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CreateTaskProp } from "./props/CreateTaskProp";
import * as state from "./states/TaskState";
import { useTaskStore } from "./states/TaskState";
import HistoryItem from "./ui/HistoryItem";

function CreateTask(props: CreateTaskProp): React.JSX.Element {
    // Task State
    const taskStore: state.TaskStore = useTaskStore();

    // Dropdown state
    const [open, setOpen] = useState(false);
    const [selectedCategory, setCategory] = useState("");

    // Input Value
    const inputValueRef = useRef<number>(0);
    const inputRef = useRef<TextInput>(null);

    // Additional value state
    const [additionalValue, setAdditionalValue] = useState(0);

    // Realm Hook
    const realmTask: TaskQuery = useTaskQuery();

    /**
     * Category Total Value will always dispatch on category change
     */
    const categoryTotalValue = useMemo(() => {
        if (taskStore.currentTask.category === "") return 0;

        try {
            return realmTask.getTotalSumByCategory(taskStore.currentTask.category);
        } catch (error) {
            console.error('Error getting tasks:', error);
            return 0;
        }
    }, [taskStore.currentTask.category, realmTask])

    /**
     * History List will always dispatch on category change
     */
    const historyList: Task[] = useMemo(() => {
        if (taskStore.currentTask.category === "") return [];

        try {
            return realmTask.getHistoryByCategory(taskStore.currentTask.category);
        } catch (error) {
            console.error('Error getting tasks:', error);
            return [];
        }
    }, [taskStore.currentTask.category, realmTask]);

    useLayoutEffect(() => {
        setCategory(taskStore.currentTask.category);
    }, [taskStore.currentTask]);

    function onDismiss() {
        taskStore.resetCurrentTask();
        inputRef.current?.clear();
        setAdditionalValue(0);
        props.onDismiss();
    }

    function onAddUpdate() {
        if (taskStore.currentTask.price === 0) return;

        const createdTask: Omit<Task, '_id'> = taskStore.currentTask;
        try {
            if (props.isUpdate) {
                realmTask.updateTaskObject(taskStore.currentTask.price, taskStore.currentTask);
            } else {
                realmTask.writeTaskObject(createdTask);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
        onDismiss();
    }

    function onAddAdditional() {
        const value = Number(inputValueRef.current);
        if (!isNaN(value) && value > 0) {
            setAdditionalValue((prev) => prev + value);
            taskStore.updatePrice(additionalValue + value);
            inputRef.current?.clear();
        }
    }

    function onResetAdditional() {
        setAdditionalValue(0);
    }

    function onCategoryChange(value: string | null) {
        if (value === null) {
            return;
        }

        const categoryInfo = CATEGORIES.find(
            (category) => category.value === selectedCategory
        );

        if (!categoryInfo) {
            return;
        }

        taskStore.resetCurrentTask();
        taskStore.updateId(historyList.at(0)?._id ?? "")
        taskStore.updateCategory(categoryInfo.value);
        taskStore.updateBackgroundColor(categoryInfo.color);
        taskStore.updateLastPrice(categoryTotalValue);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onDismiss={onDismiss}
        >
            <Pressable onPress={onDismiss}>
                <View style={styles.backdrop}></View>
            </Pressable>
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding">
                    <View style={styles.modalView}>

                        {/* Category Dropdown */}
                        <View style={styles.dropdownContainer}>
                            <DropDownPicker
                                style={styles.dropdownStyle}
                                open={open}
                                value={selectedCategory}
                                items={CATEGORIES}
                                setOpen={setOpen}
                                setValue={setCategory}
                                onChangeValue={(value) => onCategoryChange(value)}
                                placeholder={"Choose a category"}
                            />
                        </View>

                        {/* Price Input */}
                        <Text style={styles.textInputPlaceholderStyle}>Price</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            keyboardType="numeric"
                            ref={inputRef}
                            onChangeText={(text) => {
                                inputValueRef.current = Number(text)
                                //debounce
                                setTimeout(() => {
                                    const value = Number(text);
                                    taskStore.updatePrice(value);
                                }, 300)
                            }}
                        />
                        <Pressable onPress={onAddAdditional}>
                            <SimpleLineIcons name="plus" size={24} color="black" style={styles.additionalIconStyle} />
                        </Pressable>

                        {/* History List */}
                        <Text style={styles.historyTitle}>History</Text>
                        <View style={styles.historyContainer}>
                            <FlatList
                                data={historyList}
                                keyExtractor={(item: Task) => item._id}
                                renderItem={({ item }) => (
                                    <HistoryItem
                                        id={item._id}
                                        date={item.dateAdded.toString()}
                                        price={item.price}
                                        onEdit={() => { }}
                                    />
                                )}
                            />
                        </View>

                        {/* Bottom UI of Create */}
                        <View style={styles.sublayoutStyle}>
                            <View style={styles.totalText}>
                                <Text>To be added: ${additionalValue}</Text>
                                <Text>Total: ${categoryTotalValue}</Text>
                            </View>
                            <Pressable onPress={onResetAdditional}>
                                <Feather name="repeat" size={20} color="black" />
                            </Pressable>
                        </View>
                        <View style={styles.bottomSubLayoutStyle}>
                            <Pressable onPress={onDismiss}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={onAddUpdate} style={styles.actionButton}>
                                {(!props.isUpdate && <Text style={styles.addText}>
                                    Add
                                </Text>)}
                                {(props.isUpdate && <Text style={styles.updateText}>
                                    Update
                                </Text>)}
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        position: 'absolute',
        backgroundColor: Colors.bottom.background,
        opacity: Colors.bottom.opacity,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: Colors.light.background,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 400,
        width: 280
    },
    dropdownContainer: {
        width: 225,
    },
    dropdownStyle: {
        width: 238,
        backgroundColor: Colors.light.background,
    },
    textInputPlaceholderStyle: {
        backgroundColor: Colors.light.background,
        position: "relative",
        top: 10,
        left: 10,
        width: 38,
        zIndex: 10,
    },
    historyTitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#222222',
    },
    textInputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        width: 238,
        height: 45,
        paddingHorizontal: 5,
        fontSize: 14,
    },
    additionalIconStyle: {
        position: "absolute",
        right: 10,
        top: -35,
        width: 24,
        height: 24,
    },
    sublayoutStyle: {
        flexDirection: "row",
        marginVertical: 8,
        marginRight: 10,
        marginLeft: 8,
    },
    bottomSubLayoutStyle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 2,
    },
    totalText: {
        flex: 10,
        justifyContent: "center",
        bottom: 5
    },
    cancelText: {
        color: "red",
        padding: 14,
    },
    actionButton: {
        marginLeft: 20,
        padding: 14,
    },
    addText: {
        color: "green",
    },
    updateText: {
        color: "orange",
    },
    historyContainer: {
        width: 'auto',
        marginHorizontal: 5,
        height: 148,
        maxHeight: 148,
    }
});

export default CreateTask;
