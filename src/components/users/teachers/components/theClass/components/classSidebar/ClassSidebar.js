import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import InfoIcon from '@material-ui/icons/Info';
// import IconButton from '@material-ui/core/IconButton';

import { ClassworkContext } from '../../../../../../../myContext/ClassworkProvider';
import BottomNav from './BottomNav';
import NewImageUploadForm from '../../../img-uploadForm/NewImageUploadForm'
import './ClassSidebar.css'
export default function ClassSidebar(props) {
  // console.log("Output for: ClassSidebar -> props", props)
  const currClass  = props.location.state?.currClass;
  return (
    <ClassworkContext.Consumer>
      {(classContext) => {
        const { handleCoverImgSubmit, handleCoverImg, classworkState } = classContext
        const { coverImage } = classworkState
        return (
          <div>
            <div className="class-aside">
            <div className="cover-img-div">
            { currClass?.path ?
              <GridList cellHeight={230} >
              <GridListTile   style={{width: '100%'}}>
                <img style={{ width: '100%'}} src={coverImage? coverImage : currClass?.path ? currClass.path: ''} alt={currClass?.name || ''} />
                <GridListTileBar
                  title={currClass?.name}
            subtitle={<span>by: {`${currClass?.author.firstName} ${currClass?.author.lastName}`}</span>}
                  actionIcon={
                    <NewImageUploadForm
                    currClass={currClass}
                    user={null}
                    title='Upload new cover Image for your class'
                    src={coverImage? coverImage : currClass?.path ? currClass.path: ''}
                    handleChange={handleCoverImg}
                    handleSubmit={handleCoverImgSubmit}
                />
                  }
                />
              </GridListTile>
              </GridList> : (
                 <h4>loading...</h4>
              )
            }
                </div>
            
            <BottomNav />
            <div className="work-notifications-div">
              <p>No upcoming work due...</p>
            </div>

            <div className='class-img-upload-btn'>
                {/* <NewImageUploadForm
                title='Upload new class cover image'
                src={coverImage? coverImage : currClass?.path ? currClass.path: ''}
                handleChange={handleCoverImg}
                handleSubmit={handleCoverImgSubmit}
                /> */}
                </div>
            </div>
          </div>
        );
      }}
    </ClassworkContext.Consumer>
  );
}
