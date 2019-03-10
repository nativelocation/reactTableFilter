
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const products = [
	{
		id: 1,
		name: "Product1",
		price: 120
	},
	{
		id: 2,
		name: "Product2",
		price: 80
	},
	{
		id: 3,
		name: "Product3",
		price: 120
	},
	{
		id: 4,
		name: "Product4",
		price: 80
	},
	{
		id: 5,
		name: "Product5",
		price: 120
	},
	{
		id: 6,
		name: "Product6",
		price: 80
	}
];

class Home extends Component {
	constructor(props) {
		super(props);
	
		this.options = {
		  defaultSortName: 'name',  // default sort column name
		  defaultSortOrder: 'desc'  // default sort order
		};
	}

	render() {
		return (
			<div>
				<BootstrapTable data={ products } version="4" options={ this.options } striped hover>
					<TableHeaderColumn dataField="id" isKey dataSort>Product ID</TableHeaderColumn>
					<TableHeaderColumn dataField="name" dataSort>Product Name</TableHeaderColumn>
					<TableHeaderColumn dataField="price">Product Price</TableHeaderColumn>
				</BootstrapTable>
			</div>
		);
	}
}

export default connect(null, null)(Home);
