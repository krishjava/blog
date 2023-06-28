import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 10})
    firstname:string; 

    @Column({length: 10})
    lastname:string; 

    @Column({length : 60, unique: true })
    email:string; 

    @Column()
    password:string; 

    @Column({length : 10, unique: true })
    mobile:string; 

    @Column()
    otp:number; 

    @Column({default: false})
    isActive:boolean; 

    @Column()
    createdDate: Date;
}