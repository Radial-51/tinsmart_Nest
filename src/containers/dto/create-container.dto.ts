import { IsDate, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateContainerDto {

    @IsNumber()
    @IsPositive()
    level: number;


    @IsDate()
    @IsOptional()
    timestamp: Date;


    @IsString()
    @MinLength(3)
    status: string;

}
