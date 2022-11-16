import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blog: JSON.parse(localStorage.getItem('blog'))
    ? JSON.parse(localStorage.getItem('blog'))
    : {},
};

const CreateBlogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    createBlog: (state, action) => {
      const newBlog = action.payload;

      state.blog = newBlog;

      localStorage.setItem('blog', JSON.stringify(newBlog));
    },
  },
});

export const { createBlog } = CreateBlogSlice.actions;

export default CreateBlogSlice.reducer;
