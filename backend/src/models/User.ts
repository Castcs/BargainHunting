// src/models/User.ts

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
        // @ts-ignore
    id: number;

    @Column()
        // @ts-ignore
    username: string;

    @Column()
        // @ts-ignore
    email: string;

    @Column()
        // @ts-ignore
    password: string;

    static async getUserByUsername(username: string): Promise<User | null> {
        const user = await User.createQueryBuilder("user")
            .where("user.username = :username", { username })
            .getOne();

        return user || null; // Return user if found, otherwise null
    }

    static async createUser(username: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        return user.save();
    }
}

