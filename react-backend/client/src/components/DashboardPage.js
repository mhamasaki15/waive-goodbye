import React, { Component } from 'react';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

import { Link } from 'react-router';

//import styles from './DashboardPage.css';

require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

const events = [{
		event: 'San Diego Field Trip',
		date: new Date(2017, 11, 20).toDateString(),
		overview: "Check Status"
	},{
		event: 'SDHacks2017',
		date: new Date(2017, 10, 21).toDateString(),
		overview: "Check Status"
	}];

const options = {
	onRowClick: function(){
alert('youlciked');
	}
};


export default class DashboardPage extends Component{

render(){
	return(
		<div>
		<h1>
          Your Events
         </h1>
        

<BootstrapTable data={events} striped={true} hover={true} options = {options}>
      <TableHeaderColumn dataField="event" isKey={true} dataAlign="center" dataSort={true}>Event</TableHeaderColumn>
      <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
      <TableHeaderColumn dataField="overview" dataFormat={ this.colFormatter}>Overview</TableHeaderColumn>
  </BootstrapTable></div>


	);
}
}