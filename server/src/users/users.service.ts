import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // Temporary in-memory storage (will be replaced with database)
  private users: User[] = [];

  async create(username: string, email: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: Date.now().toString(), // Simple ID generation
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  // For testing - remove in production
  async findAll(): Promise<User[]> {
    return this.users;
  }
}