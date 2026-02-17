export type HistoryItemProp = {
  id: string;
  price: number;
  date: string;
  onEdit: () => void;
  onRemove: () => void;
};
