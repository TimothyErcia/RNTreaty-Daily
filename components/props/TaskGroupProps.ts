export type TaskGroupProps = {
    category: string;
    totalPrice: string;
    lastUpdateDate: string;
    lastPrice: string;
    onDeleteTask: () => void;
    onAddPrice: () => void;
};
