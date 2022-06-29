import { Router, Request, Response } from "express";
import { Book } from "../models";
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
}

export default BookController;