import { User } from './User';

export interface AuthServerResponse {
  message: string;
  token: string;
  userData: User;
}
