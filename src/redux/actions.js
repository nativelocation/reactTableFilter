import { createAction } from 'redux-actions';

import {
	GET_DOCLIST_REQUEST,
	GET_DOCWITHLOBSSEGMENTS_REQUEST,
	GET_METRICSWITHDOCUMENTS_REQUEST,
	SET_DOCLIST_REQUEST,
	SET_DOCWITHLOBSSEGMENTS_REQUEST,
	SET_METRICSWITHDOCUMENTS_REQUEST,
} from './constants';

export const getDocList = createAction(
	GET_DOCLIST_REQUEST,
);

export const getDocWithLobsSegments = createAction(
	GET_DOCWITHLOBSSEGMENTS_REQUEST,
);

export const getMetricsWithDocuments = createAction(
	GET_METRICSWITHDOCUMENTS_REQUEST,
);

export const setDocList = createAction(
	SET_DOCLIST_REQUEST,
	res => res,
);

export const setDocWithLobsSegments = createAction(
	SET_DOCWITHLOBSSEGMENTS_REQUEST,
	res => res,
);

export const setMetricsWithDocuments = createAction(
	SET_METRICSWITHDOCUMENTS_REQUEST,
	res => res,
);
