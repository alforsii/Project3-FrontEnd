import React from 'react';
import BottomNav from '../classNavbar/BottomNav';
import { AuthContext } from '../../../../../../../myContext/AuthProvider';

export default function ClassSidebar(props) {
  const { currClass } = props.location.state;
  return (
    <AuthContext.Consumer>
      {(context) => {

        return (
          <div>
            <div className="class-aside">
              <div className="cover-img-div">
                {currClass.path ? (
                  <img className="cover-image" src={currClass?.path} alt="" />
                ) : (
                  <h4>loading...</h4>
                )}
                <button
                  onClick={() => context.displayForm('#main-form')}
                  id="cover-img-upload-btn"
                >
                  <span>
                    <i className="fas fa-camera"></i>
                  </span>
                </button>
              </div>
            </div>
            <BottomNav />
            <div className="work-notifications-div">
              <h4> {currClass?.name} </h4>
              <h4>grade: {currClass?.grade} </h4>
              <p>No upcoming work due...</p>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
