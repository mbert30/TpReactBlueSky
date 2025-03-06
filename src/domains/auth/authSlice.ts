import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Auth } from './types';
import { login, register, getUserById as getUserByIdApi } from './api';

export const fetchUser = createAsyncThunk('auth/fetchUser', async ({email, password }: { email: string, password: string }) => {
  const response = await login(email, password)
  return response.data
})

export const addUser = createAsyncThunk('auth/addUser', async ({email, password, username }: { email: string, password: string, username: string }) => {
  const response = await register(email, password, username)
  return response.data
})

export const getUserById = createAsyncThunk('auth/getUserById', async (id: number) => {
  const response = await getUserByIdApi(id)
  return response.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {token: '', isLogged: false, userInfo: { username: '', id: 0 }} as Auth,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("isLogged")
      sessionStorage.removeItem("id")
      sessionStorage.removeItem("username")
      state.token = ''
      state.isLogged = false
      state.userInfo.username = ''
      state.userInfo.id = 0
    },
    getInfoSession: (state) => {
        state.token = sessionStorage.getItem("token") ?? ''
        state.isLogged = sessionStorage.getItem("isLogged") === 'true'
        state.userInfo.id = Number(sessionStorage.getItem("id")) || 0
        state.userInfo.username = sessionStorage.getItem("username") ?? ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
          state.token = action.payload.accessToken
          state.isLogged = true
          state.userInfo.id = action.payload.user.id
          state.userInfo.username = action.payload.user.username
          sessionStorage.setItem("token", state.token)
          sessionStorage.setItem("isLogged", `${state.isLogged}`)
          sessionStorage.setItem("id", String(state.userInfo.id))
          sessionStorage.setItem("username", state.userInfo.username)
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLogged = false
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken
        state.isLogged = true
        state.userInfo.id = action.payload.user.id
        state.userInfo.username = action.payload.user.username
        sessionStorage.setItem("token", state.token)
        sessionStorage.setItem("isLogged", `${state.isLogged}`)
        sessionStorage.setItem("id", String(state.userInfo.id))
        sessionStorage.setItem("username", state.userInfo.username)
      })
      .addCase(addUser.rejected, (state) => {
        state.isLogged = false
      })
      .addCase(getUserById.fulfilled, (action) => {
        return action
      })
      .addCase(getUserById.rejected, (state) => {
        state.isLogged = false
      })
  }
})

export const { logout, getInfoSession } = authSlice.actions
export default authSlice.reducer;