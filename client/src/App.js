import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AddPatient from './screens/AddPatient';
import NewPatient from './screens/NewPatient';
import NotFound from './screens/NotFound';

function App() {

  return (
    <Router >
      <Switch>
        <Route exact path="/">
          <Redirect to="/addPatient" />
        </Route>
        <Route exact path="/addPatient" component={AddPatient} />
        <Route exact path="/newPatient/:id" component={NewPatient} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
