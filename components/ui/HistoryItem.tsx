import { Colors } from '@/constants/Colors';
import useTaskQuery, { TaskQuery } from '@/hooks/useTaskQuery';
import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HistoryItemProp } from '../props/HistoryItemProps';

function HistoryItem(props: HistoryItemProp) {

    const realmTask: TaskQuery = useTaskQuery();

    const dateFormat = new Date(props.date).toLocaleDateString('en-US') + ' ' + new Date(props.date).getHours() + ':' + new Date(props.date).getMinutes();

    const onRemove = useCallback(() => {
        realmTask.deleteById(props.id);
    }, [realmTask, props])

    return <>
        <View style={styles.container}>
            <Text style={styles.detailText}>$ {props.price}</Text>
            <Text style={styles.detailText}>{dateFormat}</Text>
            <Pressable onPress={onRemove}>
                <FontAwesome name="close" size={24} color="black" style={styles.removeIcon} />
            </Pressable>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    detailText: {
        top: 5
    },
    removeIcon: {
        color: Colors.light.personalCategory,
    }
});

export default HistoryItem