import useTaskObjectQuery from "@/hooks/useTaskQuery";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Header() {
    const navigation = useNavigation();
    const realmTask = useTaskObjectQuery();

    return (
        <View style={styles.container}>
            <Pressable style={styles.menuStyle} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}>
                <Image
                    source={require("../../assets/images/icon_menu.png")}
                    style={{ width: 27, height: 27 }}
                />
            </Pressable>
            <Pressable style={styles.buttonStyle} onPress={() => {
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
