import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto  {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;   

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsOptional()
    rol: string;
}
