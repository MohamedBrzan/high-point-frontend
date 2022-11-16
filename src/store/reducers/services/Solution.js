import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  serviceSolution: JSON.parse(localStorage.getItem('serviceSolution'))
    ? JSON.parse(localStorage.getItem('serviceSolution'))
    : {},
};

const CreateServiceSolutionSlice = createSlice({
  name: 'serviceSolution',
  initialState,
  reducers: {
    createServiceSolution: (state, action) => {
      const newSolution = action.payload;

      state.serviceSolution = newSolution;

      localStorage.setItem('serviceSolution', JSON.stringify(newSolution));
    },
  },
});

export const { createServiceSolution } = CreateServiceSolutionSlice.actions;

export default CreateServiceSolutionSlice.reducer;
