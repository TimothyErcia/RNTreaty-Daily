import { Realm } from "@realm/react";
import { TaskObject } from "./TaskObject";

export class TaskGroupObject extends Realm.Object {
    category!: string;
    totalPrice!: number;
    backgroundColor!: string;
    taskList!: TaskObject[];

    static generate(
        category: string,
        totalPrice: number,
        backgroundColor: string,
        taskList: TaskObject[]
    ) {
        return {
            category,
            totalPrice,
            backgroundColor,
            taskList,
        };
    }

    static schema = {
        name: 'TaskGroupObject',
        primaryKey: 'category',
        properties: {
            category: 'string',
            totalPrice: 'int',
            backgroundColor: 'string',
            taskList: 'TaskObject[]',
        },
    };
}
