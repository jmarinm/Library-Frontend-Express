import { Router, Request, Response } from "express";
import { Loan } from "../models";
import moment from "moment";

class LoanController {
    public path = '/loan';
    public router = Router();


    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get(this.path+'/get', this.getAllLoans);
        this.router.get(this.path+'/get/:id', this.getLoanById);
        this.router.post(this.path+'/create', this.createLoan);
        this.router.put(this.path+'/update/:id', this.updateLoanById);
        this.router.delete(this.path+'/delete/:id', this.deleteLoanById);
    }

    private getAllLoans = (req: Request, res: Response) => {
        Loan.findAll().then((loans: Array<Loan>)=>{
            res.send(loans)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private getLoanById = (req: Request, res: Response) => {
        Loan.findAll( {where: {id: req.params.id }}).then((loans)=>{
            res.send(loans)
        }).catch((err)=>{
            console.log(err);
        });
    }

    private createLoan = (req: Request, res: Response) => {
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
    }
    private updateLoanById = (req:Request, res: Response)=> {
        Loan.update(req.body, {where:{id: req.params.id}}
            ).catch((err)=>
            console.log(err))
        res.send("loan updated")
    }
    
    private deleteLoanById = (req: Request, res: Response) => {
        Loan.destroy({where: {id: req.params.id}});
        res.send("loan deleted") 
    }
}

export default LoanController;