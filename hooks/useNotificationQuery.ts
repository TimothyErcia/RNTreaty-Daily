import { Notification, NotificationObject } from "@/model/NotificationObject";
import { useQuery, useRealm } from "@realm/react";

export type INotificationQuery = {
    getNotification: () => Notification | undefined;
    createOrUpdateTime: (date: Date, notification?: Notification) => void;
};

function useNotificationQuery(): INotificationQuery {
    const realm = useRealm();
    const notificationObject = useQuery(NotificationObject);

    function getNotification(): Notification | undefined {
        if (notificationObject.length === 0) {
            return undefined;
        }
        const notification = notificationObject.at(0)!.toJSON() as Notification;
        return notification;
    }

    function createOrUpdateTime(newDate: Date, notification?: Notification) {
        realm.write(() => {
            if (notification) {
                const notificationObj = realm.objectForPrimaryKey('NotificationObject', notification._id);
                if (notificationObj) {
                    notificationObj.dateOfTrigger = newDate;
                }
            } else {
                realm.create(
                    "NotificationObject",
                    NotificationObject.generate({ dateOfTrigger: newDate }),
                );
            }
        });
    }

    return {
        getNotification,
        createOrUpdateTime,
    };
}

export default useNotificationQuery;
