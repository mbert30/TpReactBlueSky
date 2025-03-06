import axios from "axios";
import { toast } from "react-toastify";
import { messageErreur } from "../../app/toastStyle";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

export const login = async (email: string, password: string): Promise<any> => {
  try {
    return await instance.post('login', { email: email, password: password })
  } catch (error: any) {
    toast.error("Erreur : L'utilisateur n'existe pas", messageErreur);
    throw error
  }
}

export const register = async (email: string, password: string, username: string): Promise<any> => {
  try{
    return await instance.post('register', { email: email, password: password, username: username })
  } catch (error: any) {
    toast.error("Erreur : L'utilisateur n'a pas pu être créer", messageErreur);
    throw error
  }
}

export const getUserById = async (id: number): Promise<any> => {
  try{
    return await instance.get('users/' + id)
  } catch (error: any) {
    throw error
  }
}