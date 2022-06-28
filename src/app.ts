import express from "express";
import moment from "moment";
import * as fs from 'fs';


const app = express()
const PORT = 8080
const FILE_PATH = "./persons.csv"

app.listen(8080,() => {
    console.log(`App is running at http://localhost:${PORT}`)
})

app.use(express.json())

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


