import { createSlice } from '@reduxjs/toolkit'
import { Tweet } from './types'

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: [] as Tweet[],
  reducers: {
    addTweet: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { addTweet } = tweetSlice.actions
export default tweetSlice.reducer;