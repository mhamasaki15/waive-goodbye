import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import styles from './LoginPage.css';

'use strict';


export default class LoginPage extends Component {


  render() {
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
                <button className={styles.btn} type="submit">Login</button>
                </div>
            </form>
    </div>);
  }
}

