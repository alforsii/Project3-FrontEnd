import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function ImageAvatars({ alt, src, size }) {
  const classes = useStyles();
switch (size) {
    case 'small':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.small} />
            </div>
          );
    case 'medium':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.medium} />
            </div>
          );
    case 'large':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.large} />
            </div>
          );
    default:
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src}/>
            </div>
          );  
}
}
