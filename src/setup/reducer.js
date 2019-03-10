import { combineReducers } from 'redux-immutable';
import tableReducer from '../redux/reducer';

export default function createReducer() {
	return combineReducers({
		table: tableReducer,
	});
}
