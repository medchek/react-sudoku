import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
  isTabFocused: boolean;
}

const initialState: UiState = {
  isDarkMode: false,
  isTabFocused: true,
};

export const uiSlice = createSlice({
  initialState,
  name: "ui",
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      if (state.isDarkMode !== action.payload) {
        state.isDarkMode = action.payload;
      }
    },
    setTabIsFocused(state, action: PayloadAction<boolean>) {
      if (state.isTabFocused !== action.payload) {
        state.isTabFocused = action.payload;
      }
    },
  },
});

export const { setDarkMode, setTabIsFocused } = uiSlice.actions;

export default uiSlice.reducer;
