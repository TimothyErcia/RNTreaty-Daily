import { CATEGORIES } from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import useTaskQuery, { ITaskQuery } from "@/hooks/useTaskQuery";
import { Task } from "@/model/TaskObject";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CreateTaskProp } from "./props/CreateTaskProp";

function CreateTask(props: CreateTaskProp) {
    const [finalValue, setFinalValue] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(CATEGORIES);
    const [task, setTask] = useState<Task>();

    const realmTask: ITaskQuery = useTaskQuery();

    useEffect(() => {
        setSelectedCategory(props.selectedCategory);
        if (props.isUpdate) {
            const selectedTask = realmTask.getTaskObjectByCategory(props.selectedCategory);
            const price = selectedTask.price.toString() ?? "";
            setTask(selectedTask);
            setInputValue(price);
        }
    }, [props.selectedCategory, props.isVisible, props.isUpdate])

    const onDismiss = useCallback(() => {
        setFinalValue(0);
        setInputValue("");
        props.onDismiss();
    }, [props]);

    const onAdd = useCallback(() => {
        try {
            const value = finalValue > 0 ? finalValue : Number(inputValue);

            // Early validation
            if (isNaN(value) || value <= 0) {
                return;
            }

            const categoryInfo = CATEGORIES.find(
                (category) => category.label === selectedCategory
            );

            const createdTask = {
                category: selectedCategory,
                price: value,
                dateAdded: new Date(),
                lastPrice: value,
                backgroundColor: categoryInfo!.color
            };

            if (props.isUpdate) {
                realmTask.updateTaskObject(value, task!);
            } else {
                realmTask.writeTaskObject(createdTask);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
        onDismiss();
    }, [finalValue, inputValue, onDismiss, props.isUpdate, realmTask, selectedCategory]);

    function onCancel() {
        onDismiss();
    }

    function onAddAdditional() {
        setFinalValue((prev) => {
            return prev + Number(inputValue);
        });
        setInputValue("");
    }

    function onResetAdditional() {
        setFinalValue(0);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isVisible}
            onDismiss={props.onDismiss}
        >
            <Pressable onPress={props.onDismiss}>
                <View style={styles.backdrop}></View>
            </Pressable>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <View style={{ width: 225 }}>
                        <DropDownPicker
                            style={styles.dropdownStyle}
                            open={open}
                            value={selectedCategory}
                            items={categories}
                            setOpen={setOpen}
                            setValue={setSelectedCategory}
                            setItems={setCategories}
                            placeholder={"Choose a category"}
                        />
                    </View>
                    <Text style={styles.textInputPlaceholderStyle}>Price</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        keyboardType="numeric"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />
                    <Pressable onPress={onAddAdditional}>
                        <SimpleLineIcons name="plus" size={24} color="black" style={styles.additionalIconStyle} />
                    </Pressable>
                    <View style={styles.sublayoutStyle}>
                        <Text style={{ flex: 10 }}>Total: ${finalValue}</Text>
                        <Pressable onPress={onResetAdditional}>
                            <Feather name="repeat" size={20} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.bottomSubLayoutStyle}>
                        <Pressable onPress={onCancel}>
                            <Text style={{ color: "red", padding: 14 }}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={onAdd} style={{ marginLeft: 20, padding: 14 }}>
                            {(!props.isUpdate && <Text style={{ color: "green" }}>
                                Add
                            </Text>)}
                            {(props.isUpdate && <Text style={{ color: "orange" }}>
                                Update
                            </Text>)}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
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
        height: 225,
        width: 280
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
        width: 40,
        zIndex: 10,
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
        marginVertical: 16,
        marginRight: 10,
        marginLeft: 8,
    },
    bottomSubLayoutStyle: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 2,
    },
});

export default CreateTask;
