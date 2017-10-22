import React, { Component, Text, View, StyleSheet, TextInput, TouchableHighlight } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import styles from './CreatePage.css';
import { FilePicker } from 'react-file-picker';

'use strict';

const contactArray = [{
    name: 'John Smith',
    email: 'sirawan@usc.edu'
},{
    name: 'Melanie Hamasaki',
    email: 'mhamasak@usc.edu'
},{
    name: 'Anthony Ramos',
    email: 'ramosaj@usc.edu'
}];


export default class CreatePage extends Component {
  constructor(props){

  super(props);
    this.state = {
    eventName:'',
    eventDate:'',
    pdfString:'fieldtrip.pdf',
    contactArray: this.contactArray
     
};

this.handleChange = this.handleChange.bind(this);
this.handleDateChange = this.handleDateChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  this.setState({eventName: event.target.value });
}
handleDateChange(event) {
  this.setState({eventDate: event.target.value });
}


handleSubmit(event) {
  var body = {
    name: this.state.eventName,
    date: this.state.eventDate,
    recipients: contactArray
  };
  fetch('/trip/create', {
    method: 'post',
    body: JSON.stringify(body)
  }).then(function(response) {
    return response.json();
  });
}

  render() {
    return (

       <form onSubmit={this.handleSubmit}>
               
                <p className={styles.input_title}>Event Name</p>
                <input type="text" id="eventName" name="eventName" value={this.state.eventName} className={styles.login_box} onChange = {this.handleChange.bind(this)} placeholder="Event Name" required autofocus />
                <p className={styles.input_title}>Event Date</p>
                <input type="text" id="eventDate" className={styles.login_box} onChange = {this.handleDateChange.bind(this)} placeholder="01/01/2017" required />
                <p className={styles.input_title}></p>
                <div className={styles.btnContainer}>
                <button className={styles.btn} type="submit">Create Event</button>
                </div>
</form>
        
          

          
         
      );
    
      
  }
}


