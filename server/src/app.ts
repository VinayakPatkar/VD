import express from "express";
import { PORT } from "./config/config";
import { connectDatabase } from "./services";
import ExpressApp from "./services/ExpressApp";
const InitializeServer = async() => {
    const [ major, minor ] = process.versions.node.split('.').map(parseFloat);
    if( major < 20 ){
        console.log('Please upgrade your NodeJS version to atleast 20 or greater. \n');
        process.exit();
    }
    const app = express(); 
    ExpressApp(app);
    await connectDatabase();
    const server = app.listen(PORT,() => {
        console.log('Server Running on Port 8000');
    })
}
InitializeServer();