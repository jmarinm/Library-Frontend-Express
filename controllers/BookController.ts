import { Router, Request, Response } from "express";
import { Book } from "../models";
import * as cp from 'child_process';

class BookController {
    public path = '/book';
    public router = Router();


    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path+'/get', this.getAllBooks);
        this.router.get(this.path+'/get/:id', this.getBookById);
        this.router.post(this.path+'/create', this.createBook);
        this.router.put(this.path+'/update/:id', this.updateBookById);
        this.router.delete(this.path+'/delete/:id', this.deleteBookById);
        this.router.get(this.path+"/report", this.getBooksReport);
        this.router.get(this.path+"/report/:word", this.getBooksByWord);
    }

    private getAllBooks = (req: Request, res: Response) => {
        Book.findAll().then((books: Array<Book>)=>{
            res.send(books)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private getBookById = (req: Request, res: Response) => {
        Book.findAll( {where: {id: req.params.id }}).then((books)=>{
            res.send(books)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private createBook = (req: Request, res: Response) => {
        const {id} = req.params;
        const info = req.body;
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
    }
    private updateBookById = (req:Request, res: Response)=> {
        Book.update(req.body, {where:{id: req.params.id}}
            ).catch((err)=>
            console.log(err))
        res.send("Book updated")
    }
    
    private deleteBookById = (req: Request, res: Response) => {
        Book.destroy({where: {id: req.params.id}});
        res.send("book deleted") 
    }

    private getBooksReport = (req: Request, res: Response) =>{
        const childProcess = cp.spawn('python3',['./scripts/BooksReport.py'])
        childProcess.stdout.on('data', (data)=>{
            res.send(`Report saved at: ${data}`)
        });
        childProcess.stderr.on('data', (data)=>{
            console.log(`stderr: ${data}`)
        });
    }

    private getBooksByWord= (req:Request, res: Response)=>{

        const childProcess = cp.spawn('python3',['./scripts/BooksReport.py',req.params.word])
        childProcess.stdout.on('data', (data)=>{
            res.send(`Report saved at: ${data}`)
        });
        childProcess.stderr.on('data', (data)=>{
            console.log(`stderr: ${data}`)
        });
    }
}

export default BookController;