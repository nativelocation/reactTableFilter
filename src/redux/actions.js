import { createAction } from 'redux-actions';

import { FETCH_TABLE_REQUEST, FETCH_TABLE_SUCCESS } from './constants';

export const fetchTable = createAction(
	FETCH_TABLE_REQUEST,
);
