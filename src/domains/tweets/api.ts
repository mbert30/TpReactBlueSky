import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const login = async (): Promise<any> => {
  try {
    return await instance.get('tweet')
  } catch (error: any) {
    return error.response as Response; //TODO: Message d'erreur à faire
  }
}