import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export type TimeViewProps = {
    onChange: (event: DateTimePickerEvent, selectedDate?: Date) => void;
    date: Date;
    setVisibility: (visibility: boolean) => void;
};