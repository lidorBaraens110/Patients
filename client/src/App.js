import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AddPatient from './screens/AddPatient';

function App() {

  return (
    <Router >
      <Switch>
        <Route exact path="/">
          <Redirect to="/addPatient" />
        </Route>
        <Route path="/addPatient" component={AddPatient} />
      </Switch>
    </Router>
  );
}

export default App;
