export type TaskGroupProps = {
    category: string;
    totalPrice: string;
    lastUpdateDate: string;
    lastPrice: string;
    backgroundColor: string;
    onDeleteTask: () => void;
    onAddPrice: () => void;
    onUpdatePrice: () => void;
};
