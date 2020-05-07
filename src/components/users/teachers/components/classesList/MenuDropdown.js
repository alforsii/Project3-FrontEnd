import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';

// import CreateClassForm from '../create-class-form/CreateClassForm';

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
        {/* <MenuItem selected={name === name} onClick={handleClose}> */}
          {/* <div className="each-student">
            <img className="user-image-md" src={path} alt={name} />
            <h4>{name}</h4>
          </div> */}
           <GridList style={{ width: '100%'}}>

          <GridListTile  style={{width: '100%', padding: '10px', paddingTop: '0'}}>
            <img style={{ width: '100%'}} src={path} alt={name} />
            <GridListTileBar
              title={name}
              subtitle={<span>by: Ashraf</span>}
              actionIcon={
                <IconButton aria-label={`info about ${name}`} >
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
      </GridList>
        {/* </MenuItem> */}
          <Link
            to={{
              pathname: '/update-class/edit',
              state: {
                currClass,
                openForm: true,
                type: `Update classroom: ${currClass.name}`
              },
            }}
          >
        <MenuItem onClick={handleClose}>
            Edit
        </MenuItem>
          </Link>
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
