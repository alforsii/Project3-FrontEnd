import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Avatar from '../auth/avatar/Avatar';
import './MainNavbar.css';
const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#068ce6',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mainLink: {
    color: 'purple',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  links: {
    color: 'inherit',
    textDecoration: 'none'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  sectionMobile: {
    // display: 'flex',
    // justifyContent:'center',
    // alignItems: 'center',
    // [theme.breakpoints.up('md')]: {
    //   display: 'none',
    // },
  },
}));

export default function PrimarySearchAppBar({
  user,
  handleDrawerOpen,
  open,
  handleLogout,
  webPage,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //   const handleMobileMenuClose = () => {
  //     setMobileMoreAnchorEl(null);
  //   };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  //   const handleMobileMenuOpen = (event) => {
  //     setMobileMoreAnchorEl(event.currentTarget);
  //   };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem  onClick={handleMenuClose}>
        <Link className={classes.mainLink} to="/dashboard">
          <IconButton aria-label="profile" color="inherit">
            <Avatar src={user?.path} alt={user?.firstName} />
          </IconButton>
          Profile
        </Link>
      </MenuItem>

      <MenuItem  onClick={handleMenuClose}>
        <Link className={classes.links} to="/message-board">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          Messages
        </Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <Link  className={classes.links}  to="/notifications">
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          Notifications
        </Link>
      </MenuItem>

      <MenuItem  onClick={handleMenuClose}>
        <Link className={classes.links} to="/settings">
          <IconButton aria-label="settings" color="inherit">
            <SettingsIcon />
          </IconButton>
          Settings
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        <IconButton aria-label="settings" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  //   const mobileMenuId = 'primary-search-account-menu-mobile';
  //   const renderMobileMenu = (
  //     <Menu
  //       anchorEl={mobileMoreAnchorEl}
  //       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       id={mobileMenuId}
  //       keepMounted
  //       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //       open={isMobileMenuOpen}
  //       onClose={handleMobileMenuClose}
  //     >
  //       <MenuItem onClick={handleMobileMenuClose}>
  //         <IconButton
  //           aria-label="account of current user"
  //           aria-controls="primary-search-account-menu"
  //           aria-haspopup="true"
  //           color="inherit"
  //         >
  //           <Avatar src={user?.path} alt={user?.firstName} />
  //         </IconButton>
  //         <p>Profile</p>
  //       </MenuItem>

  //       <MenuItem onClick={handleMobileMenuClose}>
  //         <IconButton aria-label="show 4 new mails" color="inherit">
  //           <Badge badgeContent={4} color="secondary">
  //             <MailIcon />
  //           </Badge>
  //         </IconButton>
  //         <p>Messages</p>
  //       </MenuItem>

  //       <MenuItem onClick={handleMobileMenuClose}>
  //         <IconButton aria-label="show 11 new notifications" color="inherit">
  //           <Badge badgeContent={11} color="secondary">
  //             <NotificationsIcon />
  //           </Badge>
  //         </IconButton>
  //         <p>Notifications</p>
  //       </MenuItem>

  //       <MenuItem onClick={handleMobileMenuClose}>
  //         <IconButton aria-label="settings" color="inherit">
  //           <SettingsIcon />
  //         </IconButton>
  //         Settings
  //       </MenuItem>
  //       <Divider />
  //       <MenuItem
  //         onClick={() => {
  //           handleMobileMenuClose();
  //           handleLogout();
  //         }}
  //       >
  //         <IconButton aria-label="settings" color="inherit">
  //           <ExitToAppIcon />
  //         </IconButton>
  //         Logout
  //       </MenuItem>
  //     </Menu>
  //   );

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Button
            style={{  color: '#333' }}
            color="inherit"
            aria-label="web-page"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: !open,
            },'web-page')}
          >
            {webPage}
          </Button>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            IronSchool
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link
              style={{ color: '#fff' }}
              to={{
                pathname: '/update-class/edit',
                state: {
                  openForm: true,
                  currClass: null,
                  type: 'Create classroom',
                },
              }}
            >
              <IconButton aria-label="addClass" color="inherit">
                <AddIcon />
              </IconButton>
            </Link>
            <IconButton
              className="avatar"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={17} color="secondary">
                <Avatar src={user?.path} alt={user?.firstName} />
              </Badge>
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}> */}
          {/* <Link style={{color: '#fff'}}  to={{
                        pathname: '/update-class/edit',
                        state: {
                            openForm: true,
                            currClass: null
                        },
                        }}>
                <IconButton aria-label="addClass" color="inherit">
                        <AddIcon />
                </IconButton>
            </Link> */}
          {/* <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          {/* </div> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
    </div>
  );
}
