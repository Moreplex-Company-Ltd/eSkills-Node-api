import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "eskilldb.ctwk3dnfgvwn.us-west-2.rds.amazonaws.com",
//     port: 5432,
//     username: "postgres",
//     password: "E62EV5wX^2h7!28ET$2!c^%79",
//     database: "eskilldb",
//     synchronize: true,
//     logging: false,
//     entities: ["src/entity/**/*.ts"],
//     migrations: [],
//     subscribers: [],
// })


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "eskilldb",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: [],
    subscribers: [],
})

