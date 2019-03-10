import tableSagas from '../redux/sagas';

export default function* rootSaga() {
	yield [
		...tableSagas,
	];
}
