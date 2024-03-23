import { configureStore } from '@reduxjs/toolkit';
import waitSpinnerReducer from './reducers/WaitSpinnerSlice'


export const store = configureStore({
  reducer: {
    waitSpinner: waitSpinnerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch