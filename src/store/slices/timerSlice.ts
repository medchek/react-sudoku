import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerState {
  seconds: number;
  minutes: number;
  hours: number;
  isPaused: boolean;
}

const initialState: TimerState = {
  seconds: 0,
  minutes: 0,
  hours: 0,
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
    pauseTimer(state) {
      state.isPaused = true;
    },
    setSeconds(state, action: PayloadAction<number>) {
      state.seconds = action.payload;
    },
    setMinutes(state, action: PayloadAction<number>) {
      state.minutes = action.payload;
    },
    setHours(state, action: PayloadAction<number>) {
      state.hours = action.payload;
    },
    resetTimer(state) {
      state.seconds = state.minutes = state.hours = 0;
    },
  },
});

export const {
  togglePauseTimer,
  pauseTimer,
  unpauseTimer,
  setSeconds,
  setMinutes,
  setHours,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
