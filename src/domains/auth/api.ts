import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const login = async (email: string, password: string): Promise<any> => {
  try {
    return await instance.post('login', { email: email, password: password })
  } catch (error: any) {
    return error.response as Response; //TODO: Message d'erreur à faire
  }
}