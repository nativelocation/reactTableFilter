import { API } from '../setup/config';

export function getTable(param) {
	return fetch(`${API}`)
		.then(res => res.json())
		.catch(error => error);
}
