import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ITEM_HEIGHT = 48;

export default function LongMenu({ currClass, removeClass }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { _id, name, path } = currClass;
  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
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
        <MenuItem selected={`${name}`} onClick={handleClose}>
          <div className="each-student">
            <img className="user-image-md" src={path} alt={name} />
            <h4>{name}</h4>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to={{
              pathname: '/class/new',
              state: {
                currClass,
              },
            }}
          >
            Edit
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            removeClass(_id);
            return handleClose;
          }}
        >
          Remove from class
        </MenuItem>
      </Menu>
    </div>
  );
}
