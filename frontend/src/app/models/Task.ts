import { User } from './User';

export class Task {
  id?: any;
  title?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
}
