import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Schedule } from 'src/types/data';

interface schedulePropTypes {
  schedules: Schedule[];
  mySchedules: Schedule[] | null;
  myGroupSchedule: Schedule[] | null;
  loading: boolean;
}

const initialState: schedulePropTypes = {
  schedules: [],
  mySchedules: [],
  myGroupSchedule: [],
  loading: false,
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setloading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSchedules(state, action: PayloadAction<Schedule[]>) {
      state.schedules = action.payload;
    },
    setMySchedule(state, action: PayloadAction<Schedule[]>) {
      state.mySchedules = action.payload;
    },
    setMyGroupSchedule(state, action: PayloadAction<Schedule[]>) {
      state.myGroupSchedule = action.payload;
    },
  },
});

export const { setloading, setSchedules, setMySchedule, setMyGroupSchedule } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
