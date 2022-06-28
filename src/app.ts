import express from "express";
import moment from "moment";
import * as fs from 'fs';
import { Book, Borrower, Loan } from "../models";
import bodyParser from "body-parser";

const app = express()
const PORT = 8080
const FILE_PATH = "./persons.csv"
const db = require("../models");

db.sequelize.sync().then((req)=>{
    app.listen(8080,() => {
        console.log(`App is running at http://localhost:${PORT}`)
    })
})
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())


//Fase 1
app.get('/localtime', (req,res)=> {
    res.status(200).send({
        time: moment().format('LTS')
    })
});

app.post('/person', (req, res)=> {

    const {id} = req.params;
    const info = req.body;
    if (!info.name || !info.surname){
        res.status(418).send({message: "Missing Info"})
    }

    var text = fs.readFileSync(FILE_PATH,'utf8');
    fs.writeFileSync(FILE_PATH, text+`${info.name},${info.surname}\n`)

    res.send({
        "person": `${info.name} ${info.surname} registered`,
    })
})

//Fase 2


//POSTS

//Book
app.post("/book/create", (req,res)=>{
    const {id} = req.params;
    const info = req.body;
    console.log(info)
    Book.create({
        Author: info.author,
        Title: info.title,
        Description: info.description,
        Subject: info.subject,
        PublicationYear: info.year
    }).catch((err) => {
        if (err){
            console.log(err);
        }
    });

    res.send("book created")
})

//Borrower
app.post("/borrower/create", (req,res)=>{
    const {id} = req.params;
    const info = req.body;
    console.log(info)
    Borrower.create({
        Name: info.name,
        Adress: info.address,
        PostalCode: info.zipcode,
        City: info.city,
        Email: info.email,
        PhoneNumber: info.number,
    }).catch((err) => {
        if (err){
            console.log(err);
        }
    });

    res.send("borrower created")
})

//Loan
app.post("/loan/create", (req,res)=>{
    const {id} = req.params;
    const info = req.body;
    console.log(info)
    Loan.create({
        Date: moment().format(),
        BookId: info.bookId,
        BorrowerId: info.borrowerId,
    }).catch((err) => {
        if (err){
            console.log(err);
        }
    });

    res.send("loan created")
})
