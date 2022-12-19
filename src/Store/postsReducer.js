import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async(data , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.get('http://localhost:8000/api/getAllPosts')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getPendingPosts = createAsyncThunk('posts/getPendingPosts', async(data , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.get('http://localhost:8000/api/getPendingPosts')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getApprovedPosts = createAsyncThunk('posts/getApprovedPosts', async(data , thunkAPI) => {
  const {rejectWithValue , getState , dispatch} = thunkAPI;
  try {
   const response = await axios.get('http://localhost:8000/api/getApprovedPosts')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const approvePost = createAsyncThunk('posts/approvePost', async (id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.post(`http://localhost:8000/api/approvePost/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.post(`http://localhost:8000/api/deletePost/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})



const postsSlice = createSlice({
    name: 'posts' ,
    initialState:{
        allPosts : [] , 
        pendingPosts : [] ,
        approvedPosts : [] 
    } ,
    extraReducers: {
      [getAllPosts.fulfilled]: (state , action) => {
        state.allPosts = action.payload;
      },
      [getPendingPosts.fulfilled]: (state , action) => {
        state.pendingPosts = action.payload;
      },
      [getApprovedPosts.fulfilled]: (state , action) => {
        state.approvedPosts = action.payload;
      },
      [approvePost.fulfilled]: (state , action) => {
        state.approvedPosts = [action.payload , ...state.approvedPosts];
      },
      [deletePost.fulfilled]: (state , action) => {
        // console.log(action.payload);
        state.approvedPosts = state.approvedPosts.filter(e=> e.id !== action.payload);
        state.allPosts = state.allPosts.filter(e=>e.id !== action.payload);
        state.pendingPosts = state.pendingPosts.filter(e=> e.id !== action.payload);
      },
    }
})

// export const {ADD_ACCOUNT , DELETE_ACCOUNT} =accountsSlice.actions;
export default postsSlice.reducer;
