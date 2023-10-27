import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: []
};
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  }
});

export const {
  setComments
} = commentsSlice.actions;

export const selectComments = (state) => state;

export default commentsSlice.reducer;
