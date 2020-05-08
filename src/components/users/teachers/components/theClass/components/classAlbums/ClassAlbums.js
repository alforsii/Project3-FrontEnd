import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    width: '200px',
  }
}));

export default function TitlebarGridList({ users }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={280} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2}  style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {users?.map((user) => (
          <GridListTile key={user._id}>
            <img src={user.path} alt={user.firstName} />
            <GridListTileBar
              title={user.firstName}
              subtitle={<span>by: {user.firstName} {user.lastName}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${user.lastName}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
