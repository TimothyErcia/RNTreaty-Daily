import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { TimeViewProps } from '../props/TimeViewProps';

function TimeView(props: TimeViewProps): React.JSX.Element {

    const showTimePickerAndroid = () => {
        return (
            <>
                { DateTimePickerAndroid.open({ value: props.date, onChange: props.onChange, mode: 'time', design:'material' }) }
            </>
        )
    }

    const showTimePicker = () => {
        return (
            <>
                <RNDateTimePicker
                    mode="time"
                    display="spinner"
                    value={props.date}
                    themeVariant="light"
                    style={{ maxWidth: 250 }}
                    onChange={props.onChange} />
                <Text style={style.timeSegmentButton} onPress={() => {
                    props.setVisibility(false);
                }}>Confirm</Text>
            </>
        )
    }

    return Platform.OS === 'ios' ? showTimePicker() : showTimePickerAndroid();
}

export default TimeView

const style = StyleSheet.create({
    timeSegmentButton: {
        textAlign: 'center',
        backgroundColor: '#99999926',
        borderRadius: 8,
        marginHorizontal: 75,
        paddingVertical: 10
    },
});