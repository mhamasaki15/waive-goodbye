import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title';
import { Link, Redirect } from 'react-router';
import styles from './LoginPage.css';

'use strict';


export default class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        };

        this.login = this.login.bind(this);
    }

    login() {
        var usr = "value1";
        var pass = "value2";
        var self = this;
        fetch("/log", {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usr,
                password: pass
            })
        }).then(function(response) {
            console.log("why are u like this");
            console.log(self.state.redirect);
            console.log("pls");
                //check if response status is 200
            if (response.status === 200) self.setState({
                redirect: true
            });
            console.log(self.state.redirect);

            //this.props.router.push('/');
            //return response.json();
        }).catch(function(err){
            console.log("Fetch Error");
        });
}

  render() {
    if (this.state.redirect) {
        return <Redirect to="/" />;
    }

    return (
    <div className={styles.card}>
        <div className={styles.login_title}>Login</div>
            <form className={styles.formsignin}>
                <span id="reauth-email" class="reauth-email"></span>
                <p className={styles.input_title}>Email</p>
                <input type="text" id="inputEmail" className={styles.login_box} placeholder="user@gmail.com" required autofocus />
                <p className={styles.input_title}>Password</p>
                <input type="password" id="inputPassword" className={styles.login_box} placeholder="******" required />
                <p className={styles.input_title}></p>
                <div className={styles.btnContainer}>
                <button className={styles.btn} type="button" onClick = {this.login} >Login</button>
                </div>
            </form>
    </div>);
  }
}
