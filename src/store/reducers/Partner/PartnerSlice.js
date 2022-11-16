import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  partner: JSON.parse(localStorage.getItem('partner'))
    ? JSON.parse(localStorage.getItem('partner'))
    : {},
};

const CreatePartnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    createPartner: (state, action) => {
      const newPartner = action.payload;

      state.partner = newPartner;

      localStorage.setItem('partner', JSON.stringify(newPartner));
    },
  },
});

export const { createPartner } = CreatePartnerSlice.actions;

export default CreatePartnerSlice.reducer;
