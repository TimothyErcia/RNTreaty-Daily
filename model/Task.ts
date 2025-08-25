import { Realm } from "@realm/react";

export class Task extends Realm.Object {
    _id!: Realm.BSON.ObjectId;
    price!: Number;
    dateAdded!: Date;

    static generate(price: Number) {
        return {
            _id: new Realm.BSON.ObjectId(),
            price,
            dateAdded: new Date(),
        };
    }

    static schema = {
        name: "Task",
        primaryKey: "_id",
        properties: {
            _id: "objectId",
            price: "Number",
            dateAdded: "date",
        },
    };
}
