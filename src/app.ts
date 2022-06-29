import express from "express";
import moment from "moment";
import * as fs from 'fs';
import BookController from "../controllers/BookController";
import LoanController from "../controllers/LoanController";
import BorrowerController from "../controllers/BorrowerController";
import "dotenv/config";
import bodyParser from "body-parser";


const app = express()
const PORT = process.env.PORT
const FILE_PATH = "./persons.csv"
const db = require("../models");


db.sequelize.sync().then((req)=>{
    app.listen(PORT,() => {
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

//Controllers
const bookCont = new BookController();
const loanCont = new LoanController();
const borrCont = new BorrowerController();

//Routers
app.use('/',bookCont.router);
app.use('/',loanCont.router);
app.use('/',borrCont.router);
