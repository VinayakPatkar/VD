import mongoose, { Document, Schema, model } from "mongoose";
interface workerDoc extends Document {
    username: string,
    password: string,
    salt: string,
    role: [string],
}
const workerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: [String], required: true, default: ["worker"] },
},{
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret._v;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
})
const worker = model<workerDoc>('worker', workerSchema);
export { worker };
