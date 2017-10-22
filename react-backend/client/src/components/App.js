// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

//export default App;

/*import { MasterPage, HomePage, LoginPage } from './';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
class App extends Component {

}

export default App;

  render(
<Router history={browserHistory}>
  <Route path='/' component={MasterPage}/>
  <Route path='/login' component={LoginPage} />
</Router>,
  document.getElementById('app-container')
  );
}*/


import React from "react";
import Header from "./Header";
import Main from "./Main";

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);

export default App;
