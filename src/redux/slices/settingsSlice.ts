import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  selectedTab : "Settings",
  speed: 4,
  selectionColor: 0x23416E,
  backgroundColor: 0x000000,
  autoSppedCalculationPercentage : 0.03
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