import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import InfoIcon from '@material-ui/icons/Info';
// import IconButton from '@material-ui/core/IconButton';
import moment from 'moment'

import NewImageUploadForm from '../img-uploadForm/NewImageUploadForm'



function Media(props) {
  const { user,
    title,
    src,
    handleSubmit,
    handleChange,
   } = props;

  return (
    <Grid container wrap="nowrap" >
        <Box width={'100%'} my={5} style={{margin:0}}>
        {!user ? 
           ( <>
            <Skeleton variant="rect" width={'100%'} height={'300px'} />
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
            </>
          )
       
        :  (
            <>
             <GridList cellHeight={300} >

              <GridListTile   style={{width: '100%'}}>
                <img style={{ width: '100%'}} src={user?.dashboardImg} alt={''} />
                <GridListTileBar
                  title={
                    <Typography gutterBottom variant="body2">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  }
                  subtitle={
                    <Typography display="block" variant="caption">
                    {user?.city && `${user?.city},`} {user?.state && `${user?.state} • `} {user?.country && user?.country}
                    {/* <br/><Typography variant="caption">
                      {`Since • ${moment(user?.createdAt).format('LL')}`}
                    </Typography>  */}
                    </Typography>
                  }
                  actionIcon={
                      <div>
                        <NewImageUploadForm
                        user={user}
                        currClass={null}
                        style={{display:'flex'}}
                       title={title}
                       src={src}
                       handleSubmit={handleSubmit} 
                       handleChange={handleChange}/>
                      </div>
                  }
                />
              </GridListTile>
              </GridList> 
              {/* <img style={{ width: '100%', height: '300px' }} alt={''} src={user?.dashboardImg} /> */}
             {/* <Box >
               <Typography gutterBottom variant="body2">
                 {user?.firstName} {user?.lastName}
               </Typography>
               <Typography display="block" variant="caption" color="textSecondary">
               {user?.city && `${user?.city},`} {user?.state && user?.state} {user?.country && user?.country}
               </Typography>
               <Typography variant="caption" color="textSecondary">
                 {`Since • ${moment(user?.createdAt).format('LL')}`}
               </Typography>
             </Box> */}
            </>
        )}
        </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube({
  user,
  title,
  src,
  handleSubmit,
  handleChange
}) {
  return (
    <Box overflow="hidden">
      <Media loading={false}
       title={title}
       src={src}
       handleSubmit={handleSubmit} 
       handleChange={handleChange} 
      user={user}/>
    </Box>
  );
}
