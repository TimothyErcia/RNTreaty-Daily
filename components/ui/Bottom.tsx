import { Colors } from "@/constants/Colors";
import useTaskObjectQuery, { ITaskQuery } from "@/hooks/useTaskQuery";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomProps } from "../props/BottomProps";

function Bottom(props: BottomProps) {
    const realmTask: ITaskQuery = useTaskObjectQuery();

    // Use the data directly if it's reactive
    const totalPrice: number = useMemo(() => {
        try {
            return realmTask.getTotalSum();
        } catch (error) {
            console.error('Error getting tasks:', error);
            return 0;
        }
    }, [realmTask.getTotalSum]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.textColor, styles.title]}>
                    Total Spending
                </Text>
                <Text style={[styles.textColor, styles.price]}>
                    $ {totalPrice}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={props.onAddTaskGroup}>
                    <SimpleLineIcons name="plus" size={28} color="white" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.bottom.background,
        opacity: Colors.bottom.opacity,
        borderRadius: 32,
        height: 64,
        width: Dimensions.get('screen').width - 100,
        paddingHorizontal: 28,
        marginHorizontal: 45,
        position: "absolute",
        bottom: 40,
    },
    textContainer: {
        flex: 1,
        flexGrow: 1,
    },
    buttonContainer: {
        flex: 1,
        flexGrow: 0.12,
    },
    textColor: {
        color: "#FFFFFF",
    },
    title: {
        fontFamily: "kufam_regular",
        fontSize: 12,
    },
    price: {
        fontFamily: "inter",
        fontSize: 20,
    },
});

export default Bottom;
