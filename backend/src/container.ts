// backend/container.ts
import 'reflect-metadata'; // Required for decorators
import { container } from 'tsyringe';
// Example service class
import UserService from './services/UserService';
import SearchService from "./services/SearchService";

// Register your services with the container
container.register('UserService', {
    useClass: UserService,
});

container.register('SearchService', {
    useClass: SearchService,
});
