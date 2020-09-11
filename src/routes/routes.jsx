import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, GithubLogin } from '../pages';

const Routes = ({ isLoggedIn }) => {
  return (
    <Switch>
      {isLoggedIn ? (
        <>
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </>
      ) : (
        <>
          <Route path="/login" component={GithubLogin} />
          <Redirect to="/login" />
        </>
      )}
    </Switch>
  );
};

export default React.memo(Routes);
