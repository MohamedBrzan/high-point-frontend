import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceCard: JSON.parse(localStorage.getItem('serviceCard'))
    ? JSON.parse(localStorage.getItem('serviceCard'))
    : {},
};

const CreateServiceCardSlice = createSlice({
  name: 'serviceCard',
  initialState,
  reducers: {
    createServiceCard: (state, action) => {
      const newCard = action.payload;

      state.serviceCard = newCard;

      localStorage.setItem('serviceCard', JSON.stringify(newCard));
    },
  },
});

export const { createServiceCard } = CreateServiceCardSlice.actions;

export default CreateServiceCardSlice.reducer;
