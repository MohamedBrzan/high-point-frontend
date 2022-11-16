import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceTab: JSON.parse(localStorage.getItem('serviceTab'))
    ? JSON.parse(localStorage.getItem('serviceTab'))
    : {},
};

const CreateServiceTabSlice = createSlice({
  name: 'ServiceTab',
  initialState,
  reducers: {
    createServiceTab: (state, action) => {
      const newTab = action.payload;

      state.serviceTab = newTab;

      localStorage.setItem('serviceTab', JSON.stringify(newTab));
    },
  },
});

export const { createServiceTab } = CreateServiceTabSlice.actions;

export default CreateServiceTabSlice.reducer;
