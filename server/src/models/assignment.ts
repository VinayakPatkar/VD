import mongoose, { Document, Schema, model } from "mongoose";
interface assigmentDoc extends Document{
    creatorID : string
    isolationID : string;
    dateAssigned : Date;
    location : string;
}
const assignmentSchema = new Schema({
    creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "engineer", required: true},
    isolationID : { type: String, required: true },
    dateAssigned: { type: Date, required: true},
    location: { type: String, required: true},
})
const assignment = model<assigmentDoc>('assignment',assignmentSchema);
export { assignment };