import express, { Application } from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { notFound, productionError } from "../handlers/errorHandler";
import { engineerRouter, workerRouter } from "../routes";
export default async( app : Application ) => {
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use(compression());

    app.use("/worker",workerRouter);
    app.use("/engineer",engineerRouter);

    app.use(notFound);
    app.use(productionError);
}