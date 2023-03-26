export interface User {
  _id: string;
  userName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
}

export interface RegisterUser extends Pick<User, 'userName' | 'email' | 'avatarUrl'> {
  password: string;
}
export interface LoginUser extends Pick<User, 'email'> {
  password: string;
}
