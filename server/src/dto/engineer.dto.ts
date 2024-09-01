import { IsString, Length } from 'class-validator'
export class engineerInput {
    @IsString()
    @Length(8,12)
    username: string;

    @IsString()
    @Length(8,15)
    password: string;
}