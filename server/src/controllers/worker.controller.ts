import { NextFunction, Request, Response } from "express";
import { plainToInstance } from 'class-transformer';
import { validate } from "class-validator";
import axios from "axios";
import FormData from 'form-data'


import { createHashedPassword, GenerateSalt, generateToken, passwordMatch } from "../utility";
import { worker,assignment } from "../models";
import { workerInput } from "../dto";






export const workerSignup = async( req: Request, res: Response, next: NextFunction ) => {
    try {
        var workerData = plainToInstance(workerInput,req.body);
        var validationError = await validate(workerData, {validationError: {target: true}});
        if(validationError.length > 0){
            return res.status(400).json({message: " Validation Error ",error : validationError});
        }
        const { username, password } = workerData;
        const salt = await GenerateSalt();
        const hashedPassword = await createHashedPassword(password,salt);
        const workerJSON = {
            username: username,
            password: hashedPassword,
            salt: salt,
        }
        const workerInstance = await worker.create(workerJSON);
        return res.status(201).json({success: true, message: "Worker Created Successfully. Please Login."});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}
export const workerLogin = async( req: Request, res: Response, next: NextFunction ) => {
    try {
        var workerData = plainToInstance(workerInput,req.body);
        var validationError = await validate(workerData, {validationError: {target: true}});
        if(validationError.length > 0){
            return res.status(400).json({message: " Validation Error ",error : validationError});
        }
        const { username, password } = workerData;
        const workerPresent = await worker.findOne({ username: username });
        if(!workerPresent){
            return res.status(400).json({message: "Please check the credentials"});
        }
        const matchPassword = await passwordMatch(workerPresent.password, workerPresent.salt, password);
        if(!matchPassword){
            return res.status(400).json({message: "Please check the credentials"});
        }
        const token = await generateToken(workerPresent.username,workerPresent.role[0]);
        return res.status(200).json({ message: "Successfully Logged In", token: token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}

export const uploadUtility = async(req: Request, res: Response,next: NextFunction) => {
    try {
        const form = new FormData();
        form.append('image', req.file.buffer, { filename: req.file.originalname, contentType: 'image/png'});
        const ocrResponse = await axios.post("http://localhost:5000/upload", form, { headers: { ...form.getHeaders() }})
        console.log(ocrResponse.data.ocr_data)
        const allAssignments = await assignment.find({});
        const isMatch = allAssignments.some(assign => assign.isolationID === ocrResponse.data.ocr_data);
        if(isMatch){
            return res.status(200).json({message: "Isolation ID Matched"})
        }
        return res.status(400).json({message: "Could not match the ID"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}