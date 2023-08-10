import {
  Action,
  ThunkAction,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit';
import apiSlice from './api/apiSlice';

const store = configureStore({
  reducer: {
    api: apiSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const selectSurveys = createSelector(
  (state: RootState) => state.api.surveys,
  surveys => surveys,
);

export const selectAnswers = createSelector(
  (state: RootState) => state.api.answers,
  answers => answers,
);

export const selectIsLoading = createSelector(
  (state: RootState) => state.api.loading,
  loading => loading,
);

export const selectError = createSelector(
  (state: RootState) => state.api.error,
  error => error,
);

export default store;
