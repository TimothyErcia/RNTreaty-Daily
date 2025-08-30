import { CATEGORIES } from "@/constants/Categories";
import { Colors } from "@/constants/Colors";
import useTaskGroupQuery, { ITaskGroupQuery } from "@/hooks/useTaskGroupQuery";
import useTaskQuery, { ITaskQuery } from "@/hooks/useTaskQuery";
import React, { useState } from "react";
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
    const realmTaskGroup: ITaskGroupQuery = useTaskGroupQuery();


    function onAdd() {
        const value = finalValue > 0 ? finalValue : Number(inputValue);
        realmTask.writeTaskObject(value);

        const totalPrice = realmTask.getTaskObject().sum('price');
        // realmTaskGroup.writeTaskGroup(selectedCategory, totalPrice, CATEGORIES[0].color, );
        onDismiss();
    }

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

    function onDismiss() {
        setFinalValue(0);
        setInputValue("");
        props.onDismiss();
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
        height: 200,
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
        height: 35,
        paddingHorizontal: 5,
        fontSize: 14,
    },
    additionalIconStyle: {
        position: "absolute",
        right: 10,
        top: -30,
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
