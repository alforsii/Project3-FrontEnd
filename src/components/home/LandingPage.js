import React from 'react';
// import { Switch, Redirect} from 'react-router-dom';
import SignupForm from '../auth/SignupForm'
import './LandingPage.css'



const HomePage = ({handleSubmit, handleChange}) => {
        return (
            <div>
              {/* Welcome Page Container */}
              <div className="landing-page-container">
                <div>
                  <h1>Welcome to IronSchool!</h1>
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
                  <footer>
            Made with
            <span role='img' aria-label='emoji'>
              ♥️
            </span>
            at Ironhack Miami - PTWD October 2019
          </footer>
                </div>
      
                {/* { Sign up form  */}
                    <SignupForm handleSubmit={handleSubmit} handleChange={handleChange}/>
                {/* End of Sign Up form  */}
              </div>
            </div>
          );
}

export default HomePage;
