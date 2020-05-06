import React from 'react';
import {Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import HelpIcon from '@material-ui/icons/Help';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIcon from '@material-ui/icons/Assignment';
import TitleIcon from '@material-ui/icons/Title';


const ITEM_HEIGHT = 48;

export default function MenuDropdown({ displayForm }) {

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
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <HelpIcon/> Question
        </MenuItem>

        <MenuItem onClick={() => {
          handleClose()
          displayForm('#classwork-form')
          }}>
        <WorkIcon/> Classwork
        </MenuItem>
        <MenuItem>
        <AssignmentIcon/> Assignment
        </MenuItem>
        <MenuItem>
        <TitleIcon/> Topic
        </MenuItem>
      </Menu>
    </div>
  );
}
