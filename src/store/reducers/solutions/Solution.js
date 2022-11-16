import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  solutionSolution: JSON.parse(localStorage.getItem('solutionSolution'))
    ? JSON.parse(localStorage.getItem('solutionSolution'))
    : {},
};

const CreateSolutionSolutionSlice = createSlice({
  name: 'solutionSolution',
  initialState,
  reducers: {
    createSolutionSolution: (state, action) => {
      const newSolution = action.payload;

      state.solutionSolution = newSolution;

      localStorage.setItem('solutionSolution', JSON.stringify(newSolution));
    },
  },
});

export const { createSolutionSolution } = CreateSolutionSolutionSlice.actions;

export default CreateSolutionSolutionSlice.reducer;
