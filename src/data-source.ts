import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "ls-af89fdb4df3c068eafd979a1cfcfa3228ec9fa1f.chwaa90svhlp.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "dbmasteruser",
    password: "u`>v`D&NN=7CdzZ3^rk2h#9=NOr+r*T#",
    database: "eskilldb",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: [],
    subscribers: [],
})


// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "root",
//     database: "eskilldb",
//     synchronize: true,
//     logging: false,
//     entities: ["src/entity/**/*.ts"],
//     migrations: [],
//     subscribers: [],
// })

