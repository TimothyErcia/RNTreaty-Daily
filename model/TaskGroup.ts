import { Realm } from "@realm/react";
import { Task } from "./Task";

export class TaskGroup extends Realm.Object {
    category!: string;
    totalPrice!: Number;
    backgroundColor!: string;
    taskList!: Task[];

    static generate(
        category: string,
        totalPrice: Number,
        backgroundColor: string,
        taskList: Task[]
    ) {
        return {
            category,
            totalPrice,
            backgroundColor,
            taskList,
        };
    }

    static schema = {
        name: "TaskGroup",
        primaryKey: "category",
        properties: {
            category: "string",
            totalPrice: "Number",
            backgroundColor: { type: "string", default: "#000000" },
            taskList: "Task",
        },
    };
}
