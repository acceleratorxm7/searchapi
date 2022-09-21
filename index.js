import express, { query } from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());

app.get("/options", async function(req, res) { 
    let category1 = req.query.category1 || '';
    let category2 = req.query.category2 || '';
    let category3 = req.query.category3 || '';
    let category4 = req.query.category4 || '';
    
    let cate1 = await connection.query(`SELECT distinct category1 as cate FROM category order by category1 ASC`);
    let cate2 = await connection.query(`SELECT distinct category2 as cate FROM category where category1="${category1}" order by category2 ASC`);
    let cate3 = await connection.query(`SELECT distinct category3 as cate FROM category where category1="${category1}" and category2="${category2}" order by category3 ASC`);
    let cate4 = await connection.query(`SELECT distinct category4 as cate FROM category where category1="${category1}" and category2="${category2}" and category3="${category3}" order by category4 ASC`);
    let cate5 = await connection.query(`SELECT distinct category5 as cate FROM category where category1="${category1}" and category2="${category2}" and category3="${category3}" and category4="${category4}" order by category5 ASC`);

    res.send([cate1[0], cate2[0], cate3[0], cate4[0], cate5[0]]);
});

app.get("/search", async function(req, res) { 
    let headerString = "SELECT * FROM category";
    let conditionString = "SELECT * FROM category";
    let itemString = "SELECT * FROM category";

    let andOp = false; 
    let category1 = req.query.category1 ? req.query.category1: '';
    let category2 = req.query.category2 || '';
    let category3 = req.query.category3 || '';
    let category4 = req.query.category4 || '';
    let category5 = req.query.category5 || '';

    console.log(req.query, category2, category3, category4, category5);

    if(category1.length > 0) {
        if(!andOp) {
            headerString += " WHERE ";
            conditionString += " WHERE ";
            itemString += " WHERE ";
            andOp = true;
        }else {
            headerString += " AND "
            conditionString += " AND ";
            itemString += " AND ";
        }
        headerString += `category1="${category1}"`;
        conditionString += `category1="${category1}"`;
        itemString += `category1="${category1}"`;
    }


    if(category2.length > 0) {
        if(!andOp) {
            headerString += " WHERE ";
            conditionString += " WHERE ";
            itemString += " WHERE ";
            andOp = true;
        }else {
            headerString += " AND "
            conditionString += " AND ";
            itemString += " AND ";
        }
        headerString += `category2="${category2}"`;
        conditionString += `category2="${category2}"`;
        itemString += `category2="${category2}"`;
    }

    if(category3.length > 0) {
        if(!andOp) {
            headerString += " WHERE ";
            conditionString += " WHERE ";
            itemString += " WHERE ";
            andOp = true;
        }else {
            headerString += " AND "
            conditionString += " AND ";
            itemString += " AND ";
        }
        headerString += `category3="${category3}"`;
        conditionString += `category3="${category3}"`;
        itemString += `category3="${category3}"`;
    }

    if(category4.length > 0) {
        if(!andOp) {
            conditionString += " WHERE ";
            itemString += " WHERE ";
            andOp = true;
        }else {
            conditionString += " AND ";
            itemString += " AND ";
        }
        conditionString += `category4="${category4}"`;
        itemString += `category4="${category4}"`;
    }

    if(category5.length > 0) {
        if(!andOp) {
            itemString += " WHERE ";
            andOp = true;
        }else {
            itemString += " AND "
        }
        itemString += `category5="${category5}"`;
    }

    headerString += ` AND type="Header"`;
    conditionString += ` AND type="Condition"`;
    itemString += ` AND type="Item"`;

    let header = (await connection.query(headerString))[0];
    let condition = (await connection.query(conditionString))[0];
    let item = (await connection.query(itemString))[0];

    console.log(header, condition, item);
    let wrapper = [header, condition, item];
    res.send(wrapper);
})

app.listen(8080);
