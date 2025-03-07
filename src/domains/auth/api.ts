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
    return await instance.post('register', { email: email, password: password, username: username, following: [], followers: [] })
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

export const followUser = async (idFollowing: number, idFollower: number): Promise<any> => {
  try{
    const { data: currentUser } = await instance.get(`users/${idFollower}`);
    const { data: targetUser } = await instance.get(`users/${idFollowing}`);
    const isFollowing = currentUser.following.includes(idFollowing);
    if (isFollowing) {
      await Promise.all([
        instance.patch(`users/${idFollower}`, {
          following: currentUser.following.filter((id: number) => id !== idFollowing),
        }),
        instance.patch(`users/${idFollowing}`, {
          followers: targetUser.followers.filter((id: number) => id !== idFollower),
        }),
      ]);
    } else {
      await Promise.all([
        instance.patch(`users/${idFollower}`, {
          following: [...currentUser.following, idFollowing],
        }),
        instance.patch(`users/${idFollowing}`, {
          followers: [...targetUser.followers, idFollower],
        }),
      ]);
      
    }
    return !isFollowing;
  } catch (error: any) {
    throw error
  }
}