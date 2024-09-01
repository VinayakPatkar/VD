import mongoose, { Document, Schema, model } from "mongoose";
interface engineerDoc extends Document{
    username: string;
    password: string;
    salt: string;
    role: [string];
}
const engineerSchema = new Schema({
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
const engineer = model<engineerDoc>('engineer',engineerSchema);
export { engineer };