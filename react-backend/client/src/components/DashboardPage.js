import React, { Component } from 'react';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";


'use strict';
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
	},{
		event: 'Zoo Field Trip',
		date: new Date(2018, 1, 21).toDateString(),
		overview: "Check Status"
	},{
		event: 'Journey to the Center of the Earth',
		date: new Date(2018, 4, 2).toDateString(),
		overview: "Check Status"
	},{
		event: 'Willy Wonka Factory Tour',
		date: new Date(2018, 7, 21).toDateString(),
		overview: "Check Status"
	},{
		event: 'Ski Trip',
		date: new Date(2018, 1, 10).toDateString(),
		overview: "Check Status"
	},{
		event: 'Rock Climbing Trip',
		date: new Date(2018, 5, 6).toDateString(),
		overview: "Check Status"
	},{
		event: 'Magic Show',
		date: new Date(2018, 3, 21).toDateString(),
		overview: "Check Status"
	},{
		event: 'Magic Show',
		date: new Date(2018, 3, 21).toDateString(),
		overview: "Check Status"
	},{
		event: 'Magic Show',
		date: new Date(2018, 3, 21).toDateString(),
		overview: "Check Status"
	},{
		event: 'Magic Show',
		date: new Date(2018, 3, 21).toDateString(),
		overview: "Check Status"
	}];


var createStyle = {
	color: 'black'
};


export default class DashboardPage extends Component{
	constructor(){
		super();
		this.state = {
			redirect: false,
			tripUrl: ""
		};
		this.navigateToOverviewPage = this.navigateToOverviewPage.bind(this);
	}

	navigateToOverviewPage(row){
		console.log(row.event);
		this.setState({
			redirect: true,
			tripUrl: "/event/overview/" + row.event
		});
	};

render(){
	if (this.state.redirect) {
        return <Redirect to= {this.state.tripUrl} />;
    }

	const options = {
		onRowClick: this.navigateToOverviewPage
	};
	return(
		<div>
	
		<h2><Link to="/create/event" style={createStyle}>
              Create An Event + 
         </Link></h2>

		<div>
		<h1>
          Your Events
         </h1>
        </div>

<BootstrapTable data={events} striped={true} hover={true} options = {options}>
      <TableHeaderColumn dataField="event" isKey={true} dataAlign="center" dataSort={true}>Event</TableHeaderColumn>
      <TableHeaderColumn dataField="date" dataSort={true}>Date</TableHeaderColumn>
      <TableHeaderColumn dataField="overview" dataFormat={ this.colFormatter}>Overview</TableHeaderColumn>
  </BootstrapTable>

  </div>


	);
}
}