import React from 'react'
import { Route, Redirect} from 'react-router-dom'
// import auth from '../../utils/auth'

export default function protectedRoute(props) {
    const {component: Component, ...rest} =props
    console.log("Output for: protectedRoute -> props", props)
    return ( <Route exact strict path={props.to}
                render={props =>  
                    rest.loggedIn ? <Component {...props} {...rest}/> : ''
                }
            />
    )
}
