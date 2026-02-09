import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

interface props {
  dashboardEditMode: boolean;
  activeDashboard?: [] | null;
}

const initialState: props = {
  dashboardEditMode: false,
  activeDashboard: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardEditMode(state, action: PayloadAction<boolean>) {
      state.dashboardEditMode = action.payload;
    },
  },
});

export const { setDashboardEditMode } = dashboardSlice.actions;
export default dashboardSlice.reducer;
