import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment'
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import ImageUploader from './ImageUploader'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({
    src,
    currClass,
    user,
    title,
    handleSubmit,
    handleChange,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='upload-img-btn'>
      <IconButton  onClick={handleClickOpen} aria-label="upload picture" component="span">
          <PhotoCamera style={{color: 'fff', opacity: 0.8}}/>
        </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle style={{textAlign: 'center'}} id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>

        <DialogContent dividers>
            
          <GridList cellHeight={300} >

              <GridListTile   style={{width: '100%'}}>
                <img style={{ width: '100%'}} src={src} alt={src} />
                {user && 
                <GridListTileBar
                title={
                    <Typography gutterBottom variant="body2">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  }
                  subtitle={
                    <Typography display="block" variant="caption">
                    {user?.city && `${user?.city},`} {user?.state && user?.state} {user?.country && user?.country}
                    <Typography variant="caption">
                      {`Since • ${moment(user?.createdAt).format('LL')}`}
                    </Typography>
                    </Typography>
                  }
            />}
                {currClass &&
                <GridListTileBar
                title={currClass?.name}
                subtitle={<span>by: {`${currClass?.author.firstName} ${currClass?.author.lastName}`}</span>}
actionIcon={
  <IconButton aria-label={`info about`} >
    <InfoIcon style={{color: 'fff'}} />
  </IconButton>
}
/>}
              </GridListTile>
              </GridList> 
              
        </DialogContent>
          <form  onSubmit={handleSubmit} encType="multipart/form-data">
          <ImageUploader handleChange={handleChange} />

        <DialogActions>
                <Button autoFocus 
                onClick={handleClose}
                type='submit'
                color="primary">
                Submit
                </Button>
        </DialogActions>
          </form>
      </Dialog>
    </div>
  );
}
