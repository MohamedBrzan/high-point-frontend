import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  solutionCard: JSON.parse(localStorage.getItem('solutionCard'))
    ? JSON.parse(localStorage.getItem('solutionCard'))
    : {},
};

const CreateSolutionCardSlice = createSlice({
  name: 'solutionCard',
  initialState,
  reducers: {
    createSolutionCard: (state, action) => {
      const newCard = action.payload;

      state.solutionCard = newCard;

      localStorage.setItem('SolutionCard', JSON.stringify(newCard));
    },
  },
});

export const { createSolutionCard } = CreateSolutionCardSlice.actions;

export default CreateSolutionCardSlice.reducer;
