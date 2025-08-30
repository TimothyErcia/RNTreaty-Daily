import { Realm } from '@realm/react';

export class TaskObject extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    price!: number;
    dateAdded!: Date;

    static generate(price: number) {
        return {
            _id: new Realm.BSON.ObjectId(),
            price,
            dateAdded: new Date(),
        };
    }

    static schema = {
        name: 'TaskObject',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            price: 'int',
            dateAdded: 'date',
        },
    };
}
