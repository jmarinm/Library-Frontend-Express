import { Router, Request, Response } from "express";
import { Borrower } from "../models";
class BorrowerController {
    public path = '/borrower';
    public router = Router();


    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path+'/get', this.getAllBorrowers);
        this.router.get(this.path+'/get/:id', this.getBorrowerById);
        this.router.post(this.path+'/create', this.createBorrower);
        this.router.put(this.path+'/update/:id', this.updateBorrowerById);
        this.router.delete(this.path+'/delete/:id', this.deleteBorrowerById);
    }

    private getAllBorrowers = (req: Request, res: Response) => {
        Borrower.findAll().then((borrowers: Array<Borrower>)=>{
            res.send(borrowers)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private getBorrowerById = (req: Request, res: Response) => {
        Borrower.findAll( {where: {id: req.params.id }}).then((borrowers)=>{
            res.send(borrowers)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private createBorrower = (req: Request, res: Response) => {
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
    }
    private updateBorrowerById = (req:Request, res: Response)=> {
        Borrower.update(req.body, {where:{id: req.params.id}}
            ).catch((err)=>
            console.log(err))
        res.send("Borrower updated")
    }
    
    private deleteBorrowerById = (req: Request, res: Response) => {
        Borrower.destroy({where: {id: req.params.id}});
        res.send("borrower deleted") 
    }
}

export default BorrowerController;