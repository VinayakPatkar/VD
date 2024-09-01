import { IsString, Length } from 'class-validator'
export class assignmentInput {
    @IsString()
    creatorID: string;

    @IsString()
    isolationID: string;

    @IsString()
    dateAssigned: string;

    @IsString()
    location: string;
}