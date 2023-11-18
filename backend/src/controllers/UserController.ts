// src/controllers/UserController.ts
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import {User} from "../models/User";
import jwt from 'jsonwebtoken';

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    public async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await this.userService.authenticate(username, password);

            if (user) {
                // Authentication successful, create a JWT token and send it in the response
                const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1d' });

                res.status(200).json({ token });
            } else {
                // Authentication failed
                res.status(401).send('Authentication failed');
            }
        } catch (error) {
            // Handle other errors, e.g., database errors
            res.status(500).send('Internal server error');
        }
    }

    public async getUserByUsername(req: Request, res: Response): Promise<void> {
        const username = req.params.username;
        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user);
        }
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const user = req.body as User;
        const newUser = await this.userService.createUser(user);

        if (!newUser){
            res.status(404).send('Username already in use')
        } else {
            res.status(201).json(newUser);
        }
    }
}
