import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import auth from '../auth'

export default function protectedRoute({component: Component, ...rest}) {
    return (
        <div>
            <Route
                {...rest}
                render={props => {
                    if(auth.isAuthenticated()){
                        return <Component {...props} />
                    } else {
                        return <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    }
                }}
            />
        </div>
    )
}
