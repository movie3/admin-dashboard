import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllComments = createAsyncThunk('comments/getAllComments', async(data , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.get('http://localhost:8000/api/getAllComments')
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getCommentsUser = createAsyncThunk('posts/getCommentsUser', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.get(`http://localhost:8000/api/getCommentsUser/${id}`)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const getCommentsPost = createAsyncThunk('posts/getCommentsPost', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.get(`http://localhost:8000/api/getCommentsPost/${id}`)
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})

export const deleteComment = createAsyncThunk('posts/deleteComment', async(id , thunkAPI) => {
  const {rejectWithValue , getState} = thunkAPI;
  try {
   const response = await axios.post(`http://localhost:8000/api/deleteComment/${id}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
})



const commentsSlice = createSlice({
    name: 'comments' ,
    initialState:{
        allComments : [],
        commentsUser : [],
        commentsPost : [],
    } ,
    extraReducers: {
      [getAllComments.fulfilled]: (state , action) => {
        state.allComments = action.payload;
      },
      [getCommentsUser.fulfilled]: (state , action) => {
        state.commentsUser = action.payload;
      },
      [getCommentsPost.fulfilled]: (state , action) => {
        state.commentsPost = action.payload;
      },
      [deleteComment.fulfilled]: (state , action) => {
        state.allComments = state.allComments.filter(e=> e.id !== action.payload);
        state.commentsUser = state.commentsUser.filter(e=>e.id !== action.payload);
        state.commentsPost = state.commentsPost.filter(e=> e.id !== action.payload);
      },
    }
})

export default commentsSlice.reducer;
