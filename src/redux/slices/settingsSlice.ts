import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  selectedTab : "Settings",
  speed: 4,
  selectionColor: 2310510,
  backgroundColor: 0,
  autoSppedCalculationPercentage : 0.03,
  sidenavOpen : true
}

export type Settings = typeof initialState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;