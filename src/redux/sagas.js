import { put, call, takeEvery } from 'redux-saga/effects';

import {
	GET_DOCLIST_REQUEST,
	GET_DOCWITHLOBSSEGMENTS_REQUEST,
	GET_METRICSWITHDOCUMENTS_REQUEST,
} from './constants';
import {
	getDocList,
	getDocWithLobsSegments,
	getMetricsWithDocuments,
} from './api';
import {
	setDocList,
	setDocWithLobsSegments,
	setMetricsWithDocuments,
} from './actions';

function* fetchDocList() {
	const response = yield call(getDocList);
	// console.log(response);
	yield put(setDocList(response));
}

function* fetchDocWithLobsSegments() {
	const response = yield call(getDocWithLobsSegments);
	// console.log(response);
	yield put(setDocWithLobsSegments(response));
}

function* fetchMetricsWithDocuments() {
	const response = yield call(getMetricsWithDocuments);
	// console.log(response);
	yield put(setMetricsWithDocuments(response));
}

export function* sagaWatcher() {
	yield takeEvery(GET_DOCLIST_REQUEST, fetchDocList);
	yield takeEvery(GET_DOCWITHLOBSSEGMENTS_REQUEST, fetchDocWithLobsSegments);
	yield takeEvery(GET_METRICSWITHDOCUMENTS_REQUEST, fetchMetricsWithDocuments);
}

export default [
	sagaWatcher(),
];
