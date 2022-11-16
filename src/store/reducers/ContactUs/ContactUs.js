import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactUs: JSON.parse(localStorage.getItem('contactUs'))
    ? JSON.parse(localStorage.getItem('contactUs'))
    : {},
};

const CreateContactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    createContactUs: (state, action) => {
      const newContactUs = action.payload;

      state.contactUs = newContactUs;

      localStorage.setItem('contactUs', JSON.stringify(newContactUs));
    },
  },
});

export const { createContactUs } = CreateContactUsSlice.actions;

export default CreateContactUsSlice.reducer;
