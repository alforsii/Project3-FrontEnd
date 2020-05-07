import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment'



function Media(props) {
  const { user } = props;

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
              <img style={{ width: '100%', height: '300px' }} alt={''} src={user?.dashboardImg} />
             <Box >
               <Typography gutterBottom variant="body2">
                 {user?.firstName} {user?.lastName}
               </Typography>
               <Typography display="block" variant="caption" color="textSecondary">
                 {user?.country}
               </Typography>
               <Typography variant="caption" color="textSecondary">
                 {`created • ${moment(user?.createdAt).calendar()}`}
               </Typography>
             </Box>
            </>
        )}
        </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function YouTube({user}) {
  return (
    <Box overflow="hidden">
      <Media loading={false} user={user}/>
    </Box>
  );
}
