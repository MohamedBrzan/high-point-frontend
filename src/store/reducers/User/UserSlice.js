import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : {},
};

const CreateUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUser = action.payload;

      state.user = newUser;

      localStorage.setItem('user', JSON.stringify(newUser));
    },
  },
});

export const { createUser } = CreateUserSlice.actions;

export default CreateUserSlice.reducer;
