import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TitleIcon from '@material-ui/icons/Title';
import IconButton from '@material-ui/core/IconButton';


const ITEM_HEIGHT = 48;

export default function MenuDropdown({ displayForm,
  classrooms, 
  students,
   currClass }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const myStyle = {
    padding: '10px',
    marginLeft: '10px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    hover: {
      transition: 'all 1s linier',
      fontSize: '30px',
      "&:hover": {
        backgroundColor: "0  !important",
        }
    },
  }

  return (
    <div>
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
      
        <MenuItem>
        <IconButton >
           <TitleIcon/> <h4>Topic</h4>
        </IconButton>
        </MenuItem>

        <MenuItem onClick={() => {
          handleClose()
          // displayForm('#classwork-form')
          }}>
          <Link to={{
            pathname: '/classwork/create',
            state: {
              openForm: true,
              currClass,
              classrooms,
              students,
              type: 'Create classwork',
            }
          }}>
          <IconButton >
        <WorkIcon /> <h4>Classwork</h4>
            </IconButton>
          </Link>
        </MenuItem>

        <MenuItem>
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
