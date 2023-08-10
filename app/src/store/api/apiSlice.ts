import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {Answer, ApiState} from '../types';

const initialState: ApiState = {
  surveys: [],
  answers: [],
  loading: false,
  error: null,
};

const basePath =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';

export const getSurveys = createAsyncThunk('getSurveys', async () => {
  const response = await fetch(`${basePath}/get-surveys`);
  const data = await response.json();
  return data;
});

export const saveAnswersToServer = createAsyncThunk(
  'saveAnswersToServer',
  async (answers: Answer[]) => {
    await fetch(`${basePath}/save-answers`, {
      method: 'POST',
      body: JSON.stringify({answers}),
    });
  },
);

export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      const existingAnswer = state.answers.find(
        ans => ans.questionId === action.payload.questionId,
      );
      if (existingAnswer) {
        existingAnswer.answer = action.payload.answer;
      } else {
        state.answers.push(action.payload);
      }
    },
    resetAnswers: state => {
      state.answers = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getSurveys.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.surveys = payload.surveys;
      state.error = null;
    });
    builder.addCase(getSurveys.pending, state => {
      state.loading = true;
    });
    builder.addCase(getSurveys.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const {addAnswer, resetAnswers} = apiSlice.actions;

export default apiSlice.reducer;
