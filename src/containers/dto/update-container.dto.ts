
import { IsOptional, IsPositive, IsNumber, IsDate, IsString, MinLength } from 'class-validator';

export class UpdateContainerDto  {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    level: number;


    @IsDate()
    @IsOptional()
    timestamp: Date;


    @IsString()
    @MinLength(3)
    @IsOptional()
    status: string;
}
