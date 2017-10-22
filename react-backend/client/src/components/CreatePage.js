import React, { Component } from 'react';
import styles from './CreatePage.css';

//'use strict';

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
  console.log("even!");
  this.setState({eventName: event.target.value });
}
handleDateChange(event) {
  this.setState({eventDate: event.target.value });
}


handleSubmit(event) {
  event.preventDefault();
  //alert('ah');
  var body = {
    name: this.state.eventName,
    date: this.state.eventDate,
    recipients: contactArray
  };
  console.log(body);
  fetch("http://localhost:3000/trip/create", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response) {
    console.log("response");
    //return response.json();
  });
}

  render() {
    return (

       <form onSubmit={this.handleSubmit}>
               
                <p className={styles.input_title}>Event Name</p>
                <input type="text" id="eventName" name="eventName" value={this.state.eventName} className={styles.login_box} onChange = {this.handleChange} placeholder="Event Name" required autoFocus />
                <p className={styles.input_title}>Event Date</p>
                <input type="text" id="eventDate" className={styles.login_box} onChange = {this.handleDateChange} placeholder="01/01/2017" required />
                <p className={styles.input_title}></p>
                <div className={styles.btnContainer}>
                <button className={styles.btn} type="submit">Create Event</button>
                </div>
</form>
        
          

          
         
      );
    
      
  }
}


