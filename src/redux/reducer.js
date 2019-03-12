import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import {
	SET_DOCLIST_REQUEST,
	SET_DOCWITHLOBSSEGMENTS_REQUEST,
	SET_METRICSWITHDOCUMENTS_REQUEST,
} from './constants';

const initialState = fromJS({
	docList: [],
	docWithLobsSegments: [],
	metricsWithDocuments: [],
});

export default handleActions({
	[SET_DOCLIST_REQUEST]: (state, action ) => state.update('docList', () => List(action.payload.map(item => item))),
	[SET_DOCWITHLOBSSEGMENTS_REQUEST]: (state, action ) => state.update('docWithLobsSegments', () => List(action.payload.map(item => item))),
	[SET_METRICSWITHDOCUMENTS_REQUEST]: (state, action ) => state.update('metricsWithDocuments', () => List(action.payload.map(item => item))),
}, initialState);
