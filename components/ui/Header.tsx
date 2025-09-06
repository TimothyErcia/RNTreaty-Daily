import useTaskObjectQuery from "@/hooks/useTaskQuery";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { HeaderProps } from "../props/HeaderProps";

function Header(props: HeaderProps) {
    const realmTask = useTaskObjectQuery();

    return (
        <View style={styles.container}>
            <Pressable style={styles.menuStyle} onPress={() => { console.log('menu clicked'); }}>
                <Image
                    source={require("../../assets/images/icon_menu.png")}
                    style={{ width: 27, height: 27 }}
                />
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => {
                props.onDeleteAll('All Task Deleted')
                realmTask.deleteAllTaskObject();
            }}>
                <Text style={styles.textStyle}>Delete All</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 25,
        marginVertical: 14
    },
    menuStyle: {
        flex: 8,
    },
    buttonStyle: {
        borderColor: '#000000',
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    textStyle: {
        fontSize: 16
    }
})

export default Header;
