import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
 
export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Welcome!</h2>
        <hr />
        <div className="jumbotron">
          <ol className="lead">
            <li><Link to="/login">Login</Link></li>
          </ol>
        </div>
      </div>
    );
  }
}