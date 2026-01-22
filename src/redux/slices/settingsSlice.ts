import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const initialState = {
  selectedTab : "Settings",
  speed: 4,
  selectionColor: 2310510,
  backgroundColor: 0,
  autoSppedCalculationPercentage : 0.03,
  sidenavOpen : true,
  camera: {
    position: { x: 0, y: 2, z: 5 },
    target:   { x: 0, y: 0, z: 0 },
    fov: 60,
    near: 0.1,
    far: 1000
  },
  selectedObject : {
    id : null as null | string,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 0, y: 0, z: 0 }
  }
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