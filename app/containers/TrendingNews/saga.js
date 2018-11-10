import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { createNewTrendingNewsApi, fetchTrendingNewsApi } from './api';
import { SUBMIT_NEW_TRENDING_NEWS, FETCH_TRENDING_NEWS } from './constants';
import { setTrendingNews } from './actions';

export function* submitNewTrendingNewsDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield call(createNewTrendingNewsApi, values);
    yield call(resetForm);
    yield put(replace('/app/news/trends/admin/trends'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

export function* fetchTrendingNewsSaga() {
  const trendingNews = yield call(fetchTrendingNewsApi);
  yield put(setTrendingNews(trendingNews));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_TRENDING_NEWS, submitNewTrendingNewsDetails),
    takeLatest(FETCH_TRENDING_NEWS, fetchTrendingNewsSaga),
  ];
}
