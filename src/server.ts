import app from "./app";
import {Server} from "http";
import config from "./config";
import mongoose from "mongoose";


let server: Server
const port = process.env.PORT || 5000;

async function main() {
    try {
        
         // Connect to MongoDB Atlas using Mongoose
        const uri = `mongodb+srv://${config.db_user}:${config.db_pass}@cluster0.rdxg6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas Using Mongoose');

        const server = app.listen(port, () => {
            console.log(`BookBase Server Running On Port ${port}`);
        })
        
    } catch (error) {
        console.error("Error on Running BookBase Server:", error);
    }
}
main();

