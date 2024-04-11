import { configureStore } from '@reduxjs/toolkit';
import waitSpinnerReducer from './reducers/WaitSpinnerSlice'
import breadcrumbsReducer from './reducers/BreadcrumbsSlice';


export const store = configureStore({
  reducer: {
    breadcrumbs: breadcrumbsReducer,
    waitSpinner: waitSpinnerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch