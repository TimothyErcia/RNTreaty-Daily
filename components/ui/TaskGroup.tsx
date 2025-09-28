import { Colors } from "@/constants/Colors";
import React, { useLayoutEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TaskGroupProps } from "../props/TaskGroupProps";

function TaskGroup(taskGroupProp: TaskGroupProps) {
    const [bgColor, setBGColor] = useState("");
    useLayoutEffect(() => {
        setBGColor(taskGroupProp.backgroundColor);
    }, []);   

    return (
        <View style={[styles.flexColumn, styles.container, {backgroundColor: bgColor}]}>
            <View style={[styles.flexRow, styles.innerContainer]}>
                <View style={styles.textColumn}>
                    <Text style={styles.categoryStyle}>
                        {taskGroupProp.category}
                    </Text>
                    <Text style={styles.priceStyle}>
                        $ {taskGroupProp.totalPrice}
                    </Text>
                    <Text style={styles.dateStyle}>
                        Last added date:{" "}
                        {new Date(taskGroupProp.lastUpdateDate).toLocaleDateString("en-US")}{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            $ {taskGroupProp.lastPrice}
                        </Text>
                    </Text>
                </View>
                <View style={styles.iconColumn}>
                    <View
                        style={[
                            styles.flexColumn,
                            { paddingTop: 10, paddingLeft: 4 },
                        ]}
                    >
                        <Pressable onPress={taskGroupProp.onDeleteTask}>
                            <Image
                                source={require("../../assets/images/icon_trash.png")}
                                style={{ width: 21, height: 21 }}
                            />
                        </Pressable>
                    </View>
                    <View style={{ flex: 0.5 }}>
                        <Pressable onPress={taskGroupProp.onAddPrice}>
                            <Image
                                source={require("../../assets/images/icon_circle_plus.png")}
                                style={{ width: 27, height: 27 }}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flexColumn: {
        flex: 1,
        flexDirection: "column",
    },
    flexRow: {
        flex: 6,
        flexDirection: "row",
    },
    container: {
        maxHeight: 120,
        marginHorizontal: 20,
        borderRadius: 12,
    },
    innerContainer: {
        maxHeight: 113,
        marginRight: 8,
        paddingLeft: 12,
        borderRadius: 12,
        backgroundColor: Colors.light.background,
    },
    textColumn: {
        flex: 5,
        paddingTop: 10,
        paddingLeft: 5,
    },
    iconColumn: {
        flex: 0.65,
    },
    categoryStyle: {
        fontSize: 15,
        fontFamily: "inter",
        marginTop: 5,
    },
    dateStyle: {
        fontSize: 11,
        fontFamily: "inter",
        marginTop: -5,
    },
    priceStyle: {
        fontSize: 40,
        fontFamily: "kufam_regular",
        marginTop: 5,
    },
});

export default TaskGroup;
