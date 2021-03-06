import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../myContext/AuthProvider';

export default function protectedRoute(props) {
  const { component: Component, ...rest } = props;
  return (
    <AuthContext.Consumer>
      {context => {
          const { loggedIn } = context.state
        return (
          <Route
            exact
            path={props.path ===  '/class/:classId'?'/class/:classId': ''}
            render={props =>
                loggedIn ? (
                <Component {...props} {...rest} context={context}/>
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        );
      }}
    </AuthContext.Consumer>
  );
}
