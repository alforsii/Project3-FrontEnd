import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      // margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  xl: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function ImageAvatars({ alt, src, size, variant }) {
  const classes = useStyles();
switch (size) {
    case 'small':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.small} variant={variant? variant:null} />
            </div>
          );
    case 'medium':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.medium} variant={variant? variant:null} />
            </div>
          );
    case 'large':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.large} variant={variant? variant:null} />
            </div>
          );
    case 'xl':
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} className={classes.xl} variant={variant? variant:null} />
            </div>
          );
    default:
        return (
            <div className={classes.root}>
              <Avatar alt={alt} src={src} variant={variant? variant:null}/>
            </div>
          );  
}
}
