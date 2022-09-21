import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());

app.get("/options", async function(req, res) { 
    let result = await connection.query("SELECT distinct category1, category2, category3, category4, category5 FROM category order by category1 ASC, category2 ASC, category3 ASC, category4 ASC, category5 ASC");

    res.send(result[0]);
})

app.get("/search", async function(req, res) { 
    console.log(req.query);
    let result = await connection.query(`SELECT * FROM category WHERE category1='${req.query.category1}' AND category2='${req.query.category2}' AND category3='${req.query.category3}' AND category4='${req.query.category4}' AND category5='${req.query.category5}'`);

    res.send(result[0]);
})

app.listen(8080);