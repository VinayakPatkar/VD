import { IsString, Length } from 'class-validator'
export class workerInput {
    @IsString()
    @Length(8,12)
    username: string;

    @IsString()
    @Length(8,15)
    password: string;
}