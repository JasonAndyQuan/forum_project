import {Pool} from "pg";

export default new Pool({
    host:process.env.HOST,
    user:process.env.USER,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.DBPORT,
})