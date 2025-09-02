import { Realm } from '@realm/react';

export type Task = {
    _id: string;
    price: number;
    category: string
    dateAdded: Date;
    lastPrice: number;
    backgroundColor: string;
}

export class TaskObject extends Realm.Object {
    _id!: string;
    price!: number;
    category!: string;
    dateAdded!: Date;
    lastPrice!: number
    backgroundColor!: string;

    static generate(task: Omit<Task, '_id'>) {
        return {
            _id: new Realm.BSON.ObjectId(),
            price: task.price,
            category: task.category,
            dateAdded: task.dateAdded,
            lastPrice: task.lastPrice,
            backgroundColor: task.backgroundColor
        };
    }

    static schema = {
        name: 'TaskObject',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            price: 'int',
            category: 'string',
            dateAdded: 'date',
            lastPrice: 'int',
            backgroundColor: 'string'
        },
    };
}
