import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  solutionTab: JSON.parse(localStorage.getItem('solutionTab'))
    ? JSON.parse(localStorage.getItem('solutionTab'))
    : {},
};

const CreateSolutionTabSlice = createSlice({
  name: 'solutionTab',
  initialState,
  reducers: {
    createSolutionTab: (state, action) => {
      const newTab = action.payload;

      state.solutionTab = newTab;

      localStorage.setItem('solutionTab', JSON.stringify(newTab));
    },
  },
});

export const { createSolutionTab } = CreateSolutionTabSlice.actions;

export default CreateSolutionTabSlice.reducer;
