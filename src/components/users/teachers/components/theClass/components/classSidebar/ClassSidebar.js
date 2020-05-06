import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

import BottomNav from '../classNavbar/BottomNav';
import { AuthContext } from '../../../../../../../myContext/AuthProvider';
import './ClassSidebar.css'
export default function ClassSidebar(props) {
  const currClass  = props.location.state?.currClass;
  return (
    <AuthContext.Consumer>
      {(context) => {

        return (
          <div>
            <div className="class-aside">
            <div className="cover-img-div">
            { currClass?.path ?
              <GridList cellHeight={230} >

              <GridListTile   style={{width: '100%'}}>
                <img style={{ width: '100%'}} src={currClass?.path} alt={currClass?.name} />
                <GridListTileBar
                  title={currClass?.name}
                  subtitle={<span>by: Ashraf</span>}
                  actionIcon={
                    <IconButton aria-label={`info about ${currClass?.name}`} >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
              </GridList> : (
                 <h4>loading...</h4>
              )
            }
            <button
                  onClick={() => context.displayForm('#main-form')}
                  id="cover-img-upload-btn"
                >
                  <span>
                    <i className="fas fa-camera"></i>
                  </span>
                </button>
                </div>
            
            <BottomNav />
            <div className="work-notifications-div">
              <p>No upcoming work due...</p>
            </div>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
