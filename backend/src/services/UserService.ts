import { User } from '../models/User';
import { injectable } from 'tsyringe';

@injectable()
class UserService {
    // @ts-ignore
    public async getUserByUsername(username: string): Promise<User | null> {
        return await User.getUserByUsername(username);
    }

    public async createUser(user: User): Promise<User | null> {
        const existingUser = await this.getUserByUsername(user.username);
        if (!existingUser) return null;
        return await User.createUser(user.username, user.email, user.password); // Implementation to create a user in the database
    }

    public async authenticate(username: string, password: string): Promise<User | null> {
        const user = await User.getUserByUsername(username);

        if (!user) {
            return null; // User not found
        }

        if (user.password !== password) {
            return null; // Invalid password
        }

        return user; // User authenticated
    }
    // Add other methods for user-related operations
}

export default UserService;
