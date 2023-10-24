// src/models/User.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
        // @ts-ignore
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    // Additional columns and properties...
    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
}

