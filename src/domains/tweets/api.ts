import axios from "axios";
import { toast } from "react-toastify";
import { messageErreur } from "../../app/toastStyle";

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

const getFeedByPopularity = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  return await instance.get(`tweet?_expand=user&_sort=likes&_order=desc&createdAt_gte=${threeDaysAgo.toISOString()}`);
}

const getFeedByDate = async () => {
  return await instance.get('tweet?_expand=user&_sort=createdAt&_order=desc');
}

export const getFeed = async (typeTri: 'ByPopularity' | 'ByDate'): Promise<any> => {
  try {
    switch (typeTri) {
      case 'ByPopularity':
        return await getFeedByPopularity()
      case 'ByDate':
        return await getFeedByDate()
    }
  } catch (error: any) {
    toast.error('Erreur : La requête a échoué', messageErreur);
    throw error
  }
}

export const getFeedProfile = async (userId: number) => {
  try {
    return await instance.get(`tweet?userId=${userId}&_expand=user&_sort=createdAt&_order=desc`);
  } catch (error: any) {
    toast.error('Erreur : La requête a échoué', messageErreur);
    throw error
  }
}

export const addTweet = async (body: string, userId: number): Promise<any> => {
  try {
    const res = await instance.post(
      'tweet?_expand=user', 
      {
        "body": body,
        "userId": userId,
        "createdAt": new Date().toISOString(),
        "likes": 0,
        "retweets": 0
      });
      return res
  } catch (error: any) {
    toast.error('Erreur : La requête a échoué', messageErreur);
    throw error
  }
}

export const editTweet = async (id: number, body: string): Promise<any> => {
  try {
    const res = await instance.patch('tweet/'+id, {"body": body})
      return res
  } catch (error: any) {
    toast.error('Erreur : La requête a échoué', messageErreur);
    throw error
  }
}

export const deleteTweet = async (id: number): Promise<any> => {
  try {
    const res = await instance.delete('tweet/'+id)
      return res
  } catch (error: any) {
    toast.error('Erreur : La requête a échoué', messageErreur);
    throw error
  }
}