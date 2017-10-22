import React, { Component } from 'react';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

//import styles from './DashboardPage.css';

require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

const invites = [{
		name: 'Melanie Hamasaki',
		status: "Incomplete"
	},{
		name: 'Anthony Ramos',
		status: "Complete"
	}];



export default class OverviewPage extends Component{
	constructor(props){
		super(props);
		console.log(props.match.params.tripName);
	}

render(){
	return(
		<div>
		<h1>
          Event Invite Status
         </h1>
        

<BootstrapTable data={invites} striped={true} hover={true}>
      <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Event</TableHeaderColumn>
      <TableHeaderColumn dataField="status" dataSort={true}>Date</TableHeaderColumn>
  </BootstrapTable></div>


	);
}
}