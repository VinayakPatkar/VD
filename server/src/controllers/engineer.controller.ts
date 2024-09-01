import { NextFunction, Request, Response } from "express";
import { plainToInstance } from 'class-transformer';
import { validate } from "class-validator";

import { createHashedPassword, GenerateSalt, generateToken, passwordMatch } from "../utility";
import { engineerInput,assignmentInput } from "../dto";
import { engineer,assignment } from "../models";

export const engineerSignup = async(req: Request, res: Response, next: NextFunction ) => {
    try {
        var engineerData = plainToInstance(engineerInput,req.body);
        var validationError = await validate(engineerData, {validationError: {target: true}});
        if(validationError.length > 0){
            return res.status(400).json({message: " Validation Error ",error : validationError});
        }
        const { username, password } = engineerData;
        const salt = await GenerateSalt();
        const hashedPassword = await createHashedPassword(password,salt);
        const engineerJSON = {
            username: username,
            password: hashedPassword,
            salt: salt,
        }
        const engineerInstance = await engineer.create(engineerJSON);
        return res.status(201).json({success: true, message: "Engineer Created Successfully. Please Login."});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}

export const engineerSignin = async(req: Request, res: Response, next: NextFunction ) => {
    try {
        var engineerData = plainToInstance(engineerInput,req.body);
        var validationError = await validate(engineerData, {validationError: {target: true}});
        if(validationError.length > 0){
            return res.status(400).json({message: " Validation Error ",error : validationError});
        }
        const { username, password } = engineerData;
        const engineerPresent = await engineer.findOne({ username: username });
        if(!engineerPresent){
            return res.status(400).json({message: "Please check the credentials"});
        }
        const token = await generateToken(engineerPresent.username,engineerPresent.role[0]);
        return res.status(200).json({ message: "Successfully Logged In", token: token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}

export const addAssignment = async(req: Request, res: Response, next: NextFunction ) => {
    try {
        var assignmentData = plainToInstance(assignmentInput,req.body);
        var validationError = await validate(assignmentData, {validationError: {target: true}});
        if(validationError.length > 0){
            return res.status(400).json({message: " Error ",error : validationError});
        }
        const { creatorID, isolationID, dateAssigned, location } = assignmentData;
        const assignmentJSON = {
            creatorID: creatorID,
            isolationID: isolationID,
            dateAssigned: dateAssigned,
            location: location
        }
        const assignmentCreated = await assignment.create(assignmentJSON);
        return res.status(200).json({message: "Assignment Created.", data: assignmentCreated._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
}
