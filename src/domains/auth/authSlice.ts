import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth } from './types';
import { login } from './api';

export const fetchUser = createAsyncThunk('auth/fetchUser', async ({email, password }: { email: string, password: string }) => {
  const response = await login(email, password)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {token: '', isLogged: false} as Auth,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
          console.log(action.payload.accessToken)
          state.token = action.payload.accessToken
          state.isLogged = true
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLogged = false
    })
  }
})

export const {  } = authSlice.actions
export default authSlice.reducer;