import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authenticationApi } from './services/auth';
import { schoolsApi } from './services/school';
import { highschoolsApi } from './services/highschool';
import { universitiesApi } from './services/university';

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [schoolsApi.reducerPath]: schoolsApi.reducer,
    [highschoolsApi.reducerPath]: highschoolsApi.reducer,
    [universitiesApi.reducerPath]: universitiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authenticationApi.middleware, schoolsApi.middleware, highschoolsApi.middleware, universitiesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
