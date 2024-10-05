import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER'
}

//Original code
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    role: Role
}

//for test exception isNotExists(message)
// @Entity()
// export class User {

//     @PrimaryGeneratedColumn()
//     id: number

//     @Column({
//         unique: true
//     })
//     username: string;

//     @Column({
//       nullable: true
//     })
//     description: string; // add

//     @Column()
//     password: string;
    
//     @Column()
//     role: Role;
// }


