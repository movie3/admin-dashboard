import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('users/getUsers', async(data , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  // console.log(getState());
  try {
   const response = await axios.get('http://localhost:8000/api/getAllUsers')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getUserData = createAsyncThunk('users/getUserData', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  // console.log(getState());
  try {
   const response = await axios.get(`http://localhost:8000/api/getUserData/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getUserDataByPost = createAsyncThunk('users/getUserDataByPost', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  // console.log(getState());
  try {
   const response = await axios.get(`http://localhost:8000/api/getUserDataByPost/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})



const usersSlice = createSlice({
    name: 'users' ,
    initialState:{users : [] , 
    userData : {}},
    extraReducers: {
      [getUsers.fulfilled]: (state , action) => {
        state.users = action.payload;
      },
      [getUserData.fulfilled]: (state , action) => {
        state.userData = action.payload;
      },
      [getUserDataByPost.fulfilled]: (state , action) => {
        state.userData = action.payload;
      },
    }
})

export default usersSlice.reducer;
