import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MessageContext } from '../../../../../myContext/MessageProvider';

const ITEM_HEIGHT = 48;

export function MenuDropdown({
  currUser,
  addToClass,
  removeAddedUser,
  handleAlert,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { _id, firstName, path } = currUser;
  return (
    <MessageContext.Consumer>
      {(msgContext) => {
        const { updateState } = msgContext;
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
              <MenuItem
                selected={firstName === firstName}
                onClick={handleClose}
              >
                <div className="each-student">
                  <img className="user-image-md" src={path} alt={firstName} />
                  <h4>{firstName}</h4>
                </div>
              </MenuItem>

              <MenuItem onClick={handleClose}>
                <Link
                  className="each-student-link"
                  to={`/message-board/${_id}`}
                  onClick={() =>
                    updateState((prevState) => ({
                      ...prevState,
                      receiver: currUser,
                    }))
                  }
                >
                  Send message
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  addToClass(currUser);
                  removeAddedUser(currUser);
                  handleAlert(currUser);
                  handleClose();
                }}
              >
                Add to class
              </MenuItem>
            </Menu>
          </div>
        );
      }}
    </MessageContext.Consumer>
  );
}
