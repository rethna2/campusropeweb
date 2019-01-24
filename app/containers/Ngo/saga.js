import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import omit from 'lodash/omit';
import {
  SUBMIT_NEW_NGO,
  FETCH_NGOS,
  FETCH_NGO_BY_ID,
  UPDATE_NGO_BY_ID,
  CREATE_NGO,
  DELETE_NGO,
} from './constants';
import { setNgos, setInViewNgo } from './actions';
import featherClient, { ngoService } from './../../feathers';
import {
  startFetchingData,
  stopFetchingData,
  openSnack,
} from '../Home/actions';
import { selectLoggedUserDomain } from '../../store/loggeduser/selectors';

export function* submitNewNgoDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    yield ngoService.create(values);
    yield call(resetForm);
    yield put(push('/ngos'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    yield call(setSubmitting, false);
  }
}

export function* fetchNgosSaga({ selectedState }) {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    let query = {};
    if (selectedState !== 'All') {
      query = {
        operatingState: selectedState,
      };
    }
    const ngos = yield ngoService.find({ query });
    yield put(setNgos(ngos.data));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* createNgoSaga() {
  try {
    yield put(startFetchingData());
    const { user } = yield select(selectLoggedUserDomain);
    const ngo = yield ngoService.find({ query: { createdBy: user._id } });
    if (
      ngo.data.length === 0 ||
      ngo.data[0].status === 'REJECTED' ||
      user.role === 'admin'
    ) {
      yield put(push('/ngos/new'));
      yield put(stopFetchingData());
    } else {
      let errorMessage = '';
      if (ngo.data[0].status === 'APPROVED') {
        errorMessage = 'YOU ARE ALREADY ADMIN IF AN NGO.';
      }
      if (ngo.data[0].status === 'PENDING') {
        errorMessage = 'YOUR NGO IS IN PENDING';
      }
      yield put(openSnack('warning', errorMessage));
      yield put(stopFetchingData());
    }
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* updateNgoSaga({ ngo }) {
  try {
    yield put(startFetchingData());
    if (ngo.status === 'REJECTED') {
      yield ngoService.remove(ngo._id);
    } else {
      yield ngoService.patch(ngo._id, omit(ngo, 'createdBy', '_id'));
    }
    yield put(push('/ngos/verification'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* fetchNgoByIdSaga({ ngoId }) {
  try {
    yield put(startFetchingData());
    const ngo = yield ngoService.get(ngoId);
    yield put(setInViewNgo(ngo));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* deleteNgoSaga({ ngoId }) {
  // TODO: write code to delete the saga
  console.log('deleteSaga ngoId', ngoId);
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_NGO, submitNewNgoDetails),
    takeLatest(FETCH_NGOS, fetchNgosSaga),
    takeLatest(FETCH_NGO_BY_ID, fetchNgoByIdSaga),
    takeLatest(UPDATE_NGO_BY_ID, updateNgoSaga),
    takeLatest(CREATE_NGO, createNgoSaga),
    takeLatest(DELETE_NGO, deleteNgoSaga),
  ];
}
