
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
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
			filter: {
				lob: {
					placeholder: 'LOB',
					value: '',
					list: [],
				},
				segment: {
					placeholder: 'Segment',
					value: '',
					list: [],
				},
				bpi: {
					placeholder: 'BPI Flow',
					value: '',
					list: [],
				},
				kpi: {
					placeholder: 'KPI',
					value: '',
					list: [],
				},
				duration: {
					placeholder: 'Duration',
					value: '',
					list: [],
				},
				keywords: {
					placeholder: 'Enter Keywords',
					value: '',
					list: [],
				},
			},
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
		const filter = Object.assign({}, prevState.filter)
		if (docWithLobsSegments.length > 0) {
			filter.lob.list = docWithLobsSegments.map(item => item.lob);
		}
		if (docList.length > 0) {
			filter.duration.list = _.sortBy(_.uniq(docList.map(item => item.duration)));
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
			filter.kpi.list = _.sortBy(_.uniq(metricsWithDocuments.map(metricsWithDocument => metricsWithDocument.metricName)));
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
				if (filter.lob.value === '') {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						docWithLobsSegment.subs.forEach(sub => filter.segment.list.push(docWithLobsSegment.lob + ' - ' + sub.dept_name + ' - ' + sub.segment));
					});
				} else {
					docWithLobsSegments.forEach(docWithLobsSegment => {
						if (docWithLobsSegment.lob === filter.lob.value) {
							docWithLobsSegment.subs.forEach(sub => filter.segment.list.push(docWithLobsSegment.lob + ' - ' + sub.dept_name + ' - ' + sub.segment));
						}
					});
				}
			}
		}
		return {
			docList,
			docWithLobsSegments,
			metricsWithDocuments,
			data: docData.length > 0 ? docData : metricsData,
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
						<DropdownButton
							size="lg"
							variant="light"
							title={filter.lob.placeholder}
							id='dropdown-button-drop-lob'
							className="border dropdown-button-drop-lob"
						>
							{filter.lob.list.length > 0 && filter.lob.list.map((item, index) => (
								<div key={index} >
									<Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
									<Dropdown.Divider />
								</div>
							))}
						</DropdownButton>

						<DropdownButton
							size="lg"
							variant="light"
							title={filter.segment.placeholder}
							id='dropdown-button-drop-segment'
							className="border dropdown-button-drop-segment"
						>
							{filter.segment.list.length > 0 && filter.segment.list.map((item, index) => (
								<div key={index} >
									<Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
									<Dropdown.Divider />
								</div>
							))}
						</DropdownButton>

						<DropdownButton
							size="lg"
							variant="light"
							title={filter.bpi.placeholder}
							id='dropdown-button-drop-bpi'
							className="border dropdown-button-drop-bpi"
						>
							{filter.bpi.list.length > 0 && filter.bpi.list.map((item, index) => (
								<div key={index} >
									<Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
									<Dropdown.Divider />
								</div>
							))}
						</DropdownButton>

						<DropdownButton
							size="lg"
							variant="light"
							title={filter.kpi.placeholder}
							id='dropdown-button-drop-kpi'
							className="border dropdown-button-drop-kpi"
						>
							{filter.kpi.list.length > 0 && filter.kpi.list.map((item, index) => (
								<div key={index} >
									<Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
									<Dropdown.Divider />
								</div>
							))}
						</DropdownButton>

						<DropdownButton
							size="lg"
							variant="light"
							title={filter.duration.placeholder}
							id='dropdown-button-drop-duration'
							className="border dropdown-button-drop-duration"
						>
							{filter.duration.list.length > 0 && filter.duration.list.map((item, index) => (
								<div key={index} >
									<Dropdown.Item eventKey={index}>{item}</Dropdown.Item>
									<Dropdown.Divider />
								</div>
							))}
						</DropdownButton>

						<div className="search-key-container">
							<input className="search-key p-2" />
						</div>

						<div className="btn secondary search-btn"><i className="fa fa-search" /></div>
					</div>
				</div>
				<div className="d-flex mb-3">
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round mr-2"><i class='info fa fa-info' /></div><span>Unassigned</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round yellow mr-2"><i class='info fa fa-info' /></div><span>Assigned</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round red mr-2"><i class='info fa fa-info' /></div><span>Past due</span>
					</div>
					<div className="info-indicator d-flex align-items-center pr-2">
						<div className="round green mr-2"><i class='info fa fa-info' /></div><span>Completed</span>
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
