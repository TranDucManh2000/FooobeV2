import { configureStore } from '@reduxjs/toolkit';
import TodoReducr from './ReduxSlice';

export const store = configureStore({
  reducer: {
    stone: TodoReducr,
  },
});