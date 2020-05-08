import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Divider from '@material-ui/core/Divider';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#addcfc',
  },
  barColorPrimary: {
    backgroundColor: '#068ce6',
  },
})(LinearProgress);

const BorderLinearProgress = withStyles({
    root: {
      height: 4,
      backgroundColor: lighten('#068ce6', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#068ce6',
    },
  })(LinearProgress);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    // margin: theme.spacing(1),
  },
}));

export default function CustomizedProgressBars({ isLoading, strengthValue }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        { isLoading? 
      <ColorLinearProgress valueBuffer={strengthValue} className={classes.margin} />
      :<BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={strengthValue}
      />
      // <Divider style={{backgroundColor: '#0794f3', height: '4px'}}/>
        }
    </div>
  );
}
