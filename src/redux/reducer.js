/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable func-names */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import { FETCH_TABLE_SUCCESS } from './constants';

const initialState = fromJS([]);


export default handleActions({
	[FETCH_TABLE_SUCCESS]: (state, { payload }) => fromJS(payload.data),
}, initialState);
