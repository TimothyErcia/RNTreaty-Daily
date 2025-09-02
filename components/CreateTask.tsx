import { CATEGORIES } from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import useTaskQuery, { ITaskQuery } from "@/hooks/useTaskQuery";
import React, { useCallback, useEffect, useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CreateTaskProp } from "./props/CreateTaskProp";

function CreateTask(props: CreateTaskProp) {
    const [finalValue, setFinalValue] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState(CATEGORIES);

    const realmTask: ITaskQuery = useTaskQuery();

    useEffect(() => {
        setSelectedCategory(props.selectedCategory);
    }, [props.selectedCategory, props.isVisible])

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

            const task = {
                category: selectedCategory,
                price: value,
                dateAdded: new Date(),
                lastPrice: value,
                backgroundColor: categoryInfo!.color
            };

            realmTask.writeTaskObject(task);
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task. Please try again.');
        }
        onDismiss();
    }, [finalValue, inputValue, selectedCategory, realmTask, onDismiss]);

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
                        <Image
                            source={require("../assets/images/icon_circle_plus.png")}
                            style={styles.additionalIconStyle}
                        />
                    </Pressable>
                    <View style={styles.sublayoutStyle}>
                        <Text style={{ flex: 10 }}>Total: ${finalValue}</Text>
                        <Pressable onPress={onResetAdditional}>
                            <Image
                                source={require("../assets/images/icon_reset.png")}
                                style={{ width: 20, height: 20 }}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.bottomSubLayoutStyle}>
                        <Pressable onPress={onCancel}>
                            <Text style={{ color: "red" }}>Cancel</Text>
                        </Pressable>
                        <Pressable onPress={onAdd} style={{ marginLeft: 20 }}>
                            <Text style={{ color: "green" }}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.bottom.background,
        opacity: Colors.bottom.opacity,
    },
    modalView: {
        backgroundColor: Colors.light.background,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 225,
    },
    dropdownStyle: {
        width: 225,
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
        width: 225,
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
        marginTop: 12,
        marginHorizontal: 10,
    },
});

export default CreateTask;
