import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { BottomProps } from "../props/BottomProps";

function Bottom(props: BottomProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[styles.textColor, styles.title]}>
                    Total Spending
                </Text>
                <Text style={[styles.textColor, styles.price]}>
                    $ {props.totalPrice}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={props.onAddTaskGroup}>
                    <Image
                        source={require("../../assets/images/icon_circle_plus_white.png")}
                        style={{ width: 28, height: 28 }}
                    />
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
        width: 300,
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
        flexGrow: 0.08,
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
