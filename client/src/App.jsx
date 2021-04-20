import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './history';
import store from './store';
import Main from './components/main/index';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
