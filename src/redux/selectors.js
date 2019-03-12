import { createSelector } from 'reselect';

const tableSelector = state => state.get('table');
const docListSelector = createSelector([tableSelector], table => table.get('docList').toJS());
const docWithLobsSegmentsSelector = createSelector([tableSelector], table => table.get('docWithLobsSegments').toJS());
const metricsWithDocumentsSelector = createSelector([tableSelector], table => table.get('metricsWithDocuments').toJS());

export {
	tableSelector,
	docListSelector,
	docWithLobsSegmentsSelector,
	metricsWithDocumentsSelector,
};
