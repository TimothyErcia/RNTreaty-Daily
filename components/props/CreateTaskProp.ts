export enum ACTIONRESPONSE {
  CREATED,
  UPDATED,
  DELETED,
  UNDEFINED,
  ERROR,
}

export type CreateTaskProp = {
  isVisible: boolean;
  isUpdate: boolean;
  onDismiss: (actionResponse: ACTIONRESPONSE) => void;
};
