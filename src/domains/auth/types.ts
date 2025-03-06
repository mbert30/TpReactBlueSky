export type Auth = {
  token: string
  isLogged: boolean,
  userInfo: UserInfo
};

export type User = {
  email: string,
  password: string,
  username: string,
  id: number
};

export type UserInfo = {
  username: string,
  id: number
};