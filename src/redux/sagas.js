import { put, call, takeLatest } from 'redux-saga/effects';

import { FETCH_TABLE_REQUEST } from './constants';
import { getTable } from './api';

function* fetchAlerts(param) {
	const response = yield call(getTable, param.payload);
	// yield put(setTable(response));
}

export function* sagaWatcher() {
	yield takeLatest(FETCH_TABLE_REQUEST, fetchAlerts);
}

export default [
	sagaWatcher(),
];
