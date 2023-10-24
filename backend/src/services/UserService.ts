import { User } from '../models/User';
import { injectable } from 'tsyringe';

@injectable()
class UserService {
    // @ts-ignore
    public async getUserById(id: number): Promise<User | null> {
 // Implementation to fetch a user from the database
    }

    public async createUser(user: User): Promise<User> {
        return new User(user.username, user.email); // Implementation to create a user in the database
    }

    // Add other methods for user-related operations
}

export default UserService;
