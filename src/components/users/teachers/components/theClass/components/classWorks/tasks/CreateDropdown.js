import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TitleIcon from '@material-ui/icons/Title';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

function MenuDropdown(props) {
  const {currClass, history } = props
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      <Button onClick={() => history.goBack()}>
        <ArrowBackIcon/>
      </Button>
      <Button onClick={handleClick}>
        <AddIcon />Create
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '30ch',
            padding: '5px'
          },
        }}
      >
      
        <MenuItem onClick={handleClose}>
        <IconButton >
           <TitleIcon/> 
        </IconButton>Topic
        </MenuItem>

        <Link className={classes.link}
         to={{
          pathname: '/classwork/create',
          state: {
            openForm: true,
            currClass,
            type: 'Create classwork',
          }
        }}>
        <MenuItem onClick={() => {
          handleClose()
          }}>
          <IconButton >
        <WorkIcon /> 
            </IconButton>Classwork
        </MenuItem>
          </Link>

        <MenuItem onClick={handleClose}>
          <IconButton >
        <AssignmentIcon/> 
          </IconButton>Assignment
        </MenuItem>
     
        <MenuItem onClick={handleClose}>
          <IconButton >
          <HelpIcon/> 
          </IconButton>Question
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(MenuDropdown)