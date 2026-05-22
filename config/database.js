import {createPool} from "mysql2/promise";

export const getConnection = async () => {
    try {
        const pool = createPool({
            host: "localhost",
            user: "root",
            password: "",
            database: "capstone-fintrack"
        });
        return pool;
    } catch (err) {
        console.log(err)
    }
}