import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 10)
    firstname:string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 10)
    lastname:string; 
    
    @IsNotEmpty()
    @IsEmail()
    @Length(8, 30)
    email:string; 

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password:string; 

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    mobile:string;

    otp:number;
    isActive:boolean;  
    createdDate: Date;
}