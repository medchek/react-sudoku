import { createSlice } from "@reduxjs/toolkit";

interface TimerState {
  isPaused: boolean;
}

const initialState: TimerState = {
  isPaused: false,
};

export const timerSlice = createSlice({
  initialState,
  name: "timer",
  reducers: {
    togglePauseTimer(state) {
      state.isPaused = !state.isPaused;
    },
    unpauseTimer(state) {
      state.isPaused = false;
    },
  },
});

export const { togglePauseTimer, unpauseTimer } = timerSlice.actions;

export default timerSlice.reducer;
