export class User {
  id: string;
  username: string;
  email: string;
  password: string; // Will be hashed
  createdAt: Date;
  updatedAt: Date;
}