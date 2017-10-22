import React, { Component } from 'react';
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";

//import styles from './DashboardPage.css';

require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');



export default class OverviewPage extends Component{
	constructor(props){
		super(props);
		console.log(props.match.params.tripName);
		this.state = {
			invites: [ ],
			tripName: props.match.params.tripName
		};

		this.componentDidMount = this.componentDidMount.bind(this);
	}

	componentDidMount(){
		let self = this;
		return fetch('/trip/overview', {
			method: 'GET',
			headers: {
                'Accept': 'application/json',
	            'Content-Type': 'application/json',	
			},
			params: JSON.stringify({
				eventName: this.state.tripName
			})
		}).then((resp) => resp.json())
		.then(function(data){
			self.setState({ invites: data.body.recipients });
			console.log(self.state.invites);

		}).catch(function(err){
			console.log(err);
		});
	}

render(){
	return(
		<div>
		<h1>
          Event Invite Status
         </h1>
        

<BootstrapTable data={this.state.invites} striped={true} hover={true}>
      <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Event</TableHeaderColumn>
      <TableHeaderColumn dataField="status" dataSort={true}>Date</TableHeaderColumn>
  </BootstrapTable></div>


	);
}
}