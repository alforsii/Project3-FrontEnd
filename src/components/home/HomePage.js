import React from 'react';
// import { Switch, Redirect} from 'react-router-dom';
import SignupForm from '../auth/SignupForm'
// import Home from './Home'


const HomePage = ({handleSubmit, handleChange}) => {

//   render() {
    //   if(this.state.loggedIn){ return <Redirect to='/home'/>}
        return (
            <div>
              {/* Welcome Page Container */}
              <div className="welcome-page-container">
                <div>
                  <h1>Welcome to Ironbook!</h1>
                  <h3>Join, connect and share your memories.</h3>
                  <h4>
                    <i className="fas fa-users fa-fw"></i>Connect with friends
                  </h4>
                  <h4>
                    <i className="fas fa-comments fa-fw"></i>Chat with friends
                  </h4>
                  <h4>
                    <i className="fas fa-share-square fa-fw"></i>Share memories
                  </h4>
                </div>
      
                {/* { Sign up form  */}

                    <SignupForm handleSubmit={handleSubmit} handleChange={handleChange}/>

                {/* End of Sign Up form  */}
              </div>
              {/* End of Welcome Page Container */}
            </div>
          );
   
//   }
}

export default HomePage;
