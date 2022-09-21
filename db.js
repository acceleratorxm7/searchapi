import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "itemsearch.cwnlxw2geofu.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    password: "itemsearch",
    database: "Items"
});

export default pool;