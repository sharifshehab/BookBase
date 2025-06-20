import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res:Response) => {
    res.send('Welcome to BookBase server!');
});

 // error-handler for if no route found 
app.use((req, res, next) => {
    res.status(400).send({ message: "Rout not found" })
});

// global error-handler                    
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error })
    }
});

export default app;