import { Realm } from '@realm/react';

export type Notification = {
    _id: string;
    dateOfTrigger: Date;
}

export class NotificationObject extends Realm.Object<Notification> {

    static generate(notification: Omit<Notification, '_id'>) {
        return {
            _id: new Realm.BSON.ObjectId(),
            dateOfTrigger: notification.dateOfTrigger
        };
    }

    static schema = {
        name: 'NotificationObject',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            dateOfTrigger: 'date',
        },
    };
}
