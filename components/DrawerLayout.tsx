import { Colors } from "@/constants/Colors";
import useNotificationQuery, { INotificationQuery } from "@/hooks/useNotificationQuery";
import { SimpleLineIcons } from "@expo/vector-icons";
import {
    DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import TimeView from "./ui/TimeView";

function DrawerLayout() {
    const [toggleState, setToggleState] = useState(false);
    const [iconState, setIconState] = useState(
        require("../assets/images/icon_toggle_off.png")
    );
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const notificationQuery: INotificationQuery = useNotificationQuery();
    const notificationObject = notificationQuery.getNotification();

    const dateValue = useMemo(() => {
        try {
            return notificationObject!.dateOfTrigger;
        } catch (e) {
            return new Date();
        }
    }, [notificationObject]);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate ?? new Date();
        notificationQuery.createOrUpdateTime(currentDate, notificationObject);
    };

    const onTimePressed = () => {
        setDatePickerVisibility(true);
    };

    function parsedDate(date: Date): string {
        return `${date.getHours().toString()} : ${date
            .getMinutes()
            .toString()}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification</Text>
            <View style={styles.timeSegment}>
                <Text style={styles.timeSegmentTitle}>Time</Text>
                {isDatePickerVisible && (<TimeView onChange={onChange} date={dateValue} setVisibility={(res) => { setDatePickerVisibility(res) }} />)}
                {!isDatePickerVisible && (
                    <Text style={styles.timeDisplay} onPress={onTimePressed}>
                        {parsedDate(dateValue)}
                    </Text>
                )}
            </View>
            <View style={styles.rowSegment}>
                <Text style={styles.segmentTitle}>Toggle</Text>
                <Pressable
                    onPress={() => {
                        setToggleState(!toggleState);
                        const icon = toggleState
                            ? require("../assets/images/icon_toggle_on.png")
                            : require("../assets/images/icon_toggle_off.png");
                        setIconState(icon);
                    }}
                >
                    <Image source={iconState} style={{ width: 55, height: 55 }} />
                </Pressable>
            </View>
            <View style={styles.rowSegment}>
                <Text style={styles.segmentTitle}>Sync to Server</Text>
                <Pressable onPress={() => { }}>
                    <SimpleLineIcons
                        name="cloud-upload"
                        size={35}
                        color="#6c6c6cff"
                        style={{ marginRight: 10 }}
                    />
                </Pressable>
            </View>
        </View>
    );
}

export default DrawerLayout;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        paddingTop: 200,
        paddingHorizontal: 18,
        height: Dimensions.get("screen").height,
    },
    title: {
        fontSize: 24,
    },
    timeSegment: {
        flexDirection: "column",
    },
    timeSegmentTitle: {
        fontSize: 16,
    },
    timeDisplay: {
        fontSize: 38,
        textAlign: "center",
    },
    rowSegment: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "center",
    },
    segmentTitle: {
        flex: 1,
        fontSize: 18,
    },
});
