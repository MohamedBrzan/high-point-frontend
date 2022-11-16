import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  news: JSON.parse(localStorage.getItem('news'))
    ? JSON.parse(localStorage.getItem('news'))
    : {},
};

const CreateNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    createNews: (state, action) => {
      const newNews = action.payload;

      state.news = newNews;

      localStorage.setItem('news', JSON.stringify(newNews));
    },
  },
});

export const { createNews } = CreateNewsSlice.actions;

export default CreateNewsSlice.reducer;
