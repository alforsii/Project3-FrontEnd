import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import 'bulma/css/bulma.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './myContext/AuthProvider'
import MessageProvider from './myContext/MessageProvider'
import ClassworkProvider from './myContext/ClassworkProvider'


ReactDOM.render((
    <Router>
        <AuthProvider>
            <MessageProvider>
                <ClassworkProvider>
                    <App />
                </ClassworkProvider>
            </MessageProvider>
        </AuthProvider>
    </Router>
), document.getElementById('root'));


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
