import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Tweet } from './types'
import { getFeed, getFeedProfile, addTweet as addTweetApi, editTweet as editTweetApi, deleteTweet as deleteTweetApi} from './api'
import { WritableDraft } from 'immer'
import { toast } from 'react-toastify'
import { messageErreur, messageValidation } from '../../app/toastStyle'

export const loadFeed = createAsyncThunk('tweets/loadFeed', async (typeTri:  'ByPopularity' | 'ByDate') => {
  const response = await getFeed(typeTri)
  return response.data
})

export const loadFeedProfile = createAsyncThunk('tweets/loadFeedProfile', async (userId: number) => {
  const response = await getFeedProfile(userId)
  return response.data
})

export const addTweet = createAsyncThunk('tweets/addTweet', async ({body, userID} : {body: string, userID: number}) => {
  if(body !== "" && userID !== 0) {
    const response = await addTweetApi(body, userID)
    return response.data
  } else {
    toast.error('Erreur : Données incorrect', messageErreur);
  }
})

export const editTweet = createAsyncThunk('tweets/editTweet', async ({id, body, userId} : {id : number, body: string, userId: number}) => {
  if(id !== undefined && body !== "" && userId !== 0) {
    const response = await editTweetApi(id, body)
    return response.data
  } else {
    toast.error('Erreur : Données incorrect', messageErreur);
  }
})

export const deleteTweet = createAsyncThunk('tweets/deleteTweet', async (id: number) => {
  if(id !== undefined) {
    const response = await deleteTweetApi(id)
    return response.data
  } else {
    toast.error('Erreur : Données incorrect', messageErreur);
  }
})

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: [] as Tweet[],
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeed.fulfilled, (state, action) => {
        state.splice(0, state.length)
        action.payload.forEach((e: WritableDraft<Tweet>) => {
          state.push(e)
        })
      })
      .addCase(loadFeed.rejected, () => {
        toast.error('Erreur : Requête loadFeed refuser', messageErreur);
      })
      .addCase(loadFeedProfile.fulfilled, (state, action) => {
        state.splice(0, state.length)
        action.payload.forEach((e: WritableDraft<Tweet>) => {
          state.push(e)
        })
      })
      .addCase(loadFeedProfile.rejected, () => {
        toast.error('Erreur : Requête loadFeed refuser', messageErreur);
      })
      .addCase(addTweet.fulfilled, () => {
        
      })
      .addCase(addTweet.rejected, () => {
        toast.error('Erreur : Requête add refuser', messageErreur);
      })
      .addCase(editTweet.fulfilled, () => {

      })
      .addCase(editTweet.rejected, () => {
        toast.error('Erreur : Requête edit refuser', messageErreur);
      })
      .addCase(deleteTweet.fulfilled, () => {

      })
      .addCase(deleteTweet.rejected, () => {
        toast.error('Erreur : Requête edit refuser', messageErreur);
      })
  }
})

export default tweetSlice.reducer;