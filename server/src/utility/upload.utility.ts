import multer, { memoryStorage } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } 
    else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000000, files: 2 }
});
