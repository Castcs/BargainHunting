// src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import {inject, injectable} from "tsyringe";
import {User} from "../models/User";

@injectable()
export class UserController {
    private userService: UserService;
    constructor(@inject('UserService') userService: UserService) {
        this.userService = userService;
    }
    public async getUser(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id, 10);
        const user = await this.userService.getUserById(userId);

        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user);
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const user = req.body as User;
        const newUser = await this.userService.createUser(user);
        res.status(201).json(newUser);
    }
}
