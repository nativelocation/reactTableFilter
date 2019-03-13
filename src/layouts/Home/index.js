
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import {
	docListSelector,
	docWithLobsSegmentsSelector,
	metricsWithDocumentsSelector,
} from '../../redux/selectors';
import {
	getDocList,
	getDocWithLobsSegments,
	getMetricsWithDocuments,
} from '../../redux/actions';

import DropDownMenu from '../../components/DropDownMenu/index.js';
import './style.css';

class Home extends Component {
	constructor(props) {
		super(props);
	
		this.options = {
		  defaultSortName: 'moduleEN',  // default sort column name
		  defaultSortOrder: 'desc',  // default sort order
		  onRowClick: this.onRowClick,
		};

		this.state = {
			docList: props.docList,
			docWithLobsSegments: props.docWithLobsSegments,
			metricsWithDocuments: props.metricsWithDocuments,
			data: [],
			filter: [
				{
					placeholder: 'LOB',
					value: '',
					valueList: [],
					list: [],
				},
				{
					placeholder: 'Segment',
					value: '',
					valueList: [],
					list: [],
				},
				{
					placeholder: 'BPI Flow',
					value: '',
					valueList: [],
					list: [],
				},
				{
					placeholder: 'KPI',
					value: '',
					valueList: [],
					list: [],
				},
				{
					placeholder: 'Duration',
					value: '',
					valueList: [],
					list: [],
				},
			],
		}
	}

	componentDidMount() {
		this.props.getDocWithLobsSegments();
		this.props.getMetricsWithDocuments();
		this.props.getDocList();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let metricsData = [], docData = [];
		const { docList, docWithLobsSegments, metricsWithDocuments } = nextProps;
		const filter = prevState.filter.slice();
		if (docWithLobsSegments.length > 0) {
			filter[0].list = docWithLobsSegments.map(item => item.lob);
		}
		if (docList.length > 0) {
			filter[4].list = _.sortBy(_.uniq(docList.map(item => item.duration)));
		}
		if (docList.length > 0 && metricsWithDocuments.length > 0) {
			metricsData = docList.map(docItem => {
				let kpi = [];
				if (metricsWithDocuments.length > 0) {
					metricsWithDocuments.forEach(metricsWithDocument => {
						metricsWithDocument.subs.forEach(sub => {
							if (sub.docID === docItem.docID) {
								kpi.push(metricsWithDocument.metricName);
							}
						});
					});
				}
				return {
					...docItem,
					kpi,
				};
			});
			filter[3].list = _.sortBy(_.uniq(metricsWithDocuments.map(metricsWithDocument => metricsWithDocument.metricName)));
		}
		if (docList.length > 0 && docWithLobsSegments.length > 0) {
			const tData = metricsData.length > 0 ? metricsData : docList;
			docData = tData.map(docItem => {
				let departments = '';
				if (docWithLobsSegments.length > 0) {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						docWithLobsSegment.subs.forEach(sub => {
							sub.subs.forEach(item => {
								if (item.docID === docItem.docID) {
									departments = departments === '' ? docWithLobsSegment.lob + ' - ' + sub.dept_name : departments + ', ' + docWithLobsSegment.lob + ' - ' + sub.dept_name;
								}
							})
						})
					})
				}
				return {
					...docItem,
					departments,
				};
			});
			if (docWithLobsSegments.length > 0) {
				filter[1].list = [];
				if (filter[0].value === '') {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						docWithLobsSegment.subs.forEach(sub => filter[1].list.push(docWithLobsSegment.lob + ' - ' + sub.dept_name + ' - ' + sub.segment));
					});
				} else {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						if (_.findIndex(filter[0].valueList, item => item === docWithLobsSegment.lob) > -1) {
							docWithLobsSegment.subs.forEach(sub => filter[1].list.push(docWithLobsSegment.lob + ' - ' + sub.dept_name + ' - ' + sub.segment));
						}
					});
				}
			}
		}
		let data = docData.length > 0 ? docData : metricsData;
		_.remove(data, item => {
			let flag = false;
			if (filter[0].valueList.length > 0) {
				filter[0].valueList.forEach(value => {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						if (docWithLobsSegment.lob === value) {
							docWithLobsSegment.subs.forEach(sub => {
								sub.subs.forEach(itemSub => {
									if (itemSub.docID === item.docID) {
										flag = true;
									}
								});
							});
						}
					});
				});
				return !flag;
			} else {
				return flag;
			}
		});
		_.remove(data, item => {
			let flag = false;
			if (filter[1].valueList.length > 0) {
				filter[1].valueList.forEach(value => {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						docWithLobsSegment.subs.forEach(sub => {
							if (value === (docWithLobsSegment.lob + ' - ' + sub.dept_name + ' - ' + sub.segment)) {
								sub.subs.forEach(itemSub => {
									if (itemSub.docID === item.docID) {
										flag = true;
									}
								});
							}
						});
					});
				});
				return !flag;
			} else {
				return flag;
			}
		});
		_.remove(data, item => {
			let flag = false;
			if (filter[3].valueList.length > 0) {
				filter[3].valueList.forEach(value => {
					metricsWithDocuments.forEach(metricsWithDocument => {
						if (value === metricsWithDocument.metricName) {
							metricsWithDocument.subs.forEach(sub => {
								if (sub.docID === item.docID) {
									flag = true;
								}
							});
						}
					});
				});
				return !flag;
			} else {
				return flag;
			}
		});
		_.remove(data, item => {
			let flag = false;
			if (filter[4].valueList.length > 0) {
				filter[4].valueList.forEach(value => {
					if (parseInt(value) === parseInt(item.duration)) {
						flag = true;
					}
				});
				return !flag;
			} else {
				return flag;
			}
		});
		return {
			docList,
			docWithLobsSegments,
			metricsWithDocuments,
			data,
			filter,
		};
	}

	onRowClick = data => {
		console.log(data);
	}

	topicFormatter = (cell, row) =>
		row.assignment === 0 ?
			(`<div class='info-indicator d-flex align-items-center' style="white-space: pre-wrap"><div class='round mr-2'><i class='info fa fa-info'></i></div><span style="width: calc(100% - 32px)">${cell}</span></div>`)
		: row.assignment === 1 ?
			(`<div class='info-indicator d-flex align-items-center' style="white-space: pre-wrap"><div class='round yellow mr-2'><i class='info fa fa-info'></i></div><span style="width: calc(100% - 32px)">${cell}</span></div>`)
		: row.assignment === 2 ?
			(`<div class='info-indicator d-flex align-items-center' style="white-space: pre-wrap"><div class='round red mr-2'><i class='info fa fa-info'></i></div><span style="width: calc(100% - 32px)">${cell}</span></div>`)
		: row.assignment === 3 ?
			(`<div class='info-indicator d-flex align-items-center' style="white-space: pre-wrap"><div class='round green mr-2'><i class='info fa fa-info'></i></div><span style="width: calc(100% - 32px)">${cell}</span></div>`)
		: cell

	rateFormatter = (cell, row) =>
		(`<div class='d-flex align-items-center justify-content-center w-100'>
			<i class='fa fa-star ${cell >= 1 ? 'active' : ''}'></i>
			<i class='fa fa-star ${cell >= 2 ? 'active' : ''}'></i>
			<i class='fa fa-star ${cell >= 3 ? 'active' : ''}'></i>
			<i class='fa fa-star ${cell >= 4 ? 'active' : ''}'></i>
			<i class='fa fa-star ${cell === 5 ? 'active' : ''}'></i>
			(${cell})</div>`
		)

	kpiFormatter = (cell, row) => {
		return (`<div class='info-indicator d-flex align-items-center justify-content-center w-100'><div class='round mr-2 text-white'>${row.kpi.length}</div></div>`)
	}

	trainFormatter = (cell, row) =>
		(`<div class='d-flex align-items-center justify-content-center w-100'>${cell}${row.sideBySide === '1' ? "<i class='fa fa-user-friends'></i>" : ''}</div>`)

	draFormatter = (cell, row) =>
		(`<div class='d-flex align-items-center justify-content-center w-100'>${cell}</div>`)

	departFormatter = (cell, row) =>
		(`<div class='text-center w-100' style="white-space: pre-wrap">${cell}</div>`)

	setFilter = filter => this.setState({ filter });

	render() {
		const {
			data,
			filter,
		} = this.state;
		return (
			<div id="home" className="p-4">
				<div className="title text-center">Search a document</div>
				<div className="filter">
					<div className="d-flex">
						{filter.map((item, index) => (
							<DropDownMenu
								key={index}
								id={index}
								filter={filter}
								setFilter={this.setFilter}
							/>))}

						<div className="search-key-container">
							<input className="search-key p-2" />
						</div>

						<div className="btn secondary search-btn"><i className="fa fa-search" /></div>
					</div>
				</div>
				<div className="d-flex mb-3">
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round mr-2"><i className='info fa fa-info' /></div><span>Unassigned</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round yellow mr-2"><i className='info fa fa-info' /></div><span>Assigned</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round red mr-2"><i className='info fa fa-info' /></div><span>Past due</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round green mr-2"><i className='info fa fa-info' /></div><span>Completed</span>
					</div>
				</div>
				<BootstrapTable data={data} version="4" options={this.options} striped hover pagination>
					<TableHeaderColumn dataField="moduleEN" width={'20%'} dataFormat={this.topicFormatter} isKey dataSort>Topic</TableHeaderColumn>
					<TableHeaderColumn dataField="countRatings" width={'150px'} dataFormat={this.rateFormatter} >Rating</TableHeaderColumn>
					<TableHeaderColumn dataField="trainingType" width={'150px'} dataFormat={this.trainFormatter}>Training Type</TableHeaderColumn>
					<TableHeaderColumn dataField="kpiArray" width={'80px'} dataFormat={this.kpiFormatter}>KPI</TableHeaderColumn>
					<TableHeaderColumn dataField="departments"dataFormat={this.departFormatter}>Departments</TableHeaderColumn>
					<TableHeaderColumn dataField="duration" width={'180px'} dataFormat={this.draFormatter}>Duration (minutes)</TableHeaderColumn>
					<TableHeaderColumn dataField="lastUpdated" width={'140px'} dataFormat={this.draFormatter}>Last Updated</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

Home.propTypes = {
	getDocList: PropTypes.func.isRequired,
	docList: PropTypes.array,
	docWithLobsSegments: PropTypes.array,
	metricsWithDocuments: PropTypes.array,
};

Home.defaultProps = {
	docList: [],
	docWithLobsSegments: [],
	metricsWithDocuments: [],
};

const mapStateToProps = state => ({
	docList: docListSelector(state),
	docWithLobsSegments: docWithLobsSegmentsSelector(state),
	metricsWithDocuments: metricsWithDocumentsSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getDocList: () => dispatch(getDocList()),
	getDocWithLobsSegments: () => dispatch(getDocWithLobsSegments()),
	getMetricsWithDocuments: () => dispatch(getMetricsWithDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
