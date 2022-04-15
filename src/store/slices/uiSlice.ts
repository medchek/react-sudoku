import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isDarkMode: boolean;
  isTabFocused: boolean;
}

const initialState: UiState = {
  isDarkMode: localStorage.getItem("isDark") === "1" ? true : false,
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
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setTabIsFocused(state, action: PayloadAction<boolean>) {
      if (state.isTabFocused !== action.payload) {
        state.isTabFocused = action.payload;
      }
    },
  },
});

export const { setDarkMode, setTabIsFocused, toggleDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
