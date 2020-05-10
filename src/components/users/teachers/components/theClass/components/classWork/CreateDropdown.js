import React from 'react';
import {Link, withRouter} from 'react-router-dom'
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

function MenuDropdown({currClass, history }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const myStyle = {
  //   padding: '10px',
  //   marginLeft: '10px',
  //   display: 'flex',
  //   width: '100%',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   hover: {
  //     transition: 'all 1s linier',
  //     fontSize: '30px',
  //     "&:hover": {
  //       backgroundColor: "0  !important",
  //       }
  //   },
  // }

  return (
    <div>
      <Button onClick={() => history.goBack()}>
        <ArrowBackIcon/>
      </Button>
      <Button style={{borderRadius: '30px'}} onClick={handleClick}>
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
           <TitleIcon/> <h4>Topic</h4>
        </IconButton>
        </MenuItem>

        <Link to={{
          pathname: '/classwork/create',
          state: {
            openForm: true,
            currClass,
            type: 'Create classwork',
          }
        }}>
        <MenuItem onClick={() => {
          handleClose()
          // displayForm('#classwork-form')
          }}>
          <IconButton >
        <WorkIcon /> <h4>Classwork</h4>
            </IconButton>
        </MenuItem>
          </Link>

        <MenuItem onClick={handleClose}>
          <IconButton >
        <AssignmentIcon/> <h4>Assignment</h4>
          </IconButton>
        </MenuItem>
     
        <MenuItem onClick={handleClose}>
          <IconButton >
          <HelpIcon/> <h4>Question</h4>
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(MenuDropdown)