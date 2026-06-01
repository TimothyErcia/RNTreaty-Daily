import { Notification, NotificationObject } from "@/model/NotificationObject";
import { useQuery, useRealm } from "@realm/react";

export type NotificationQuery = {
  hasNotificationSet: () => boolean;
};

function useNotificationQuery(): NotificationQuery {
  const realm = useRealm();
  const notificationObject = useQuery(NotificationObject);

  function hasNotificationSet(): boolean {
    if (notificationObject && notificationObject.length === 0) {
      realm.write(() => {
        realm.create("NotificationObject", NotificationObject.generate({
          hasNotificationSet: true
        }));
      });
    } else if (notificationObject && notificationObject.length > 0) {
      const notification = notificationObject.at(0)!.toJSON() as Notification;

      return notification.hasNotificationSet;
    }

    return false;
  }

  return {
    hasNotificationSet,
  };
}

export default useNotificationQuery;
