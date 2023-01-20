import mariadb from "mariadb"
import * as dotenv from "dotenv"
dotenv.config()


const DB = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
})


const connection = await DB.getConnection();
console.log("Database is running ...");

export default connection;
