import { Colors } from '@/constants/Colors';
import { SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

function DrawerLayout() {
    const [toggleString, setToggleString] = useState('');
    
    useEffect(() => {
        setToggleString('icon_toggle_off.png');
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification</Text>
            <View style={styles.timeSegment}>
                <Text style={styles.segmentTitle}>Time</Text>
                <Text style={styles.timeDisplay}>8:00 PM</Text>
            </View>
            <View style={styles.rowSegment}>
                <Text style={styles.segmentTitle}>Toggle</Text>
                <Pressable onPress={() => {
                    setToggleString('icon_toggle_on.png')
                }}>
                    <Image
                        source={require("../assets/images/icon_toggle_off.png")}
                        style={{ width: 55, height: 55 }}
                    />
                </Pressable>
            </View>
            <View style={styles.rowSegment}>
                <Text style={styles.segmentTitle}>Sync to Server</Text>
                <Pressable onPress={() => {}}>
                    <SimpleLineIcons name="cloud-upload" size={35} color="#6c6c6cff" style={{marginRight: 10}} />
                </Pressable>
            </View>
        </View>
    )
}

export default DrawerLayout

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        paddingTop: 200,
        paddingHorizontal: 18,
        height: Dimensions.get('screen').height
    },
    title: {
        fontSize: 24
    },
    timeSegment: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 10
    },
    timeDisplay: {
        fontSize: 38,
        textAlign: 'center'
    },
    rowSegment: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    segmentTitle: {
        flex: 1,
        fontSize: 18
    }
});