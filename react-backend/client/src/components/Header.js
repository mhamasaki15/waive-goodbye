import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css'

export default class Header extends React.Component {
  render() {
    return (
      <nav className={styles.navbar}>
          <ul className={styles.navbar_left}>
              <li><Link to="/">
              WaiveGoodbye
              </Link></li>
          </ul>
          <ul className = {styles.navbar_left}>
            <li><Link to="/dashboard">
                   Dashboard
              </Link>
            </li>
          </ul>
          <ul className={styles.navbar_left}>
            <li><Link to="/login">
              Login
              </Link></li>
          </ul> 
          <ul className={styles.navbar_left}>
            <li><Link to="/login">
              Log Out
              </Link></li>
          </ul>     
        
      </nav>
    );
  }
}