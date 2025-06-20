import dotenv from "dotenv";
dotenv.config();


export default {
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASS
}