// backend/container.ts
import 'reflect-metadata'; // Required for decorators
import { container } from 'tsyringe';
// Example service class
import UserService from './services/UserService';

// Register your services with the container
container.register('UserService', {
    useClass: UserService,
});
