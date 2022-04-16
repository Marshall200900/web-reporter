import sqlite from "sqlite3";
const db = new sqlite.Database("./database.db");
export default db;
