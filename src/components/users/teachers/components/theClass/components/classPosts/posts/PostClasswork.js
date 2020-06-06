import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core';

import './PostClasswork.css';
const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    margin: '20px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  description: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const dropMenu = ['Copy', 'Edit', 'Delete'];
export default function ControlledExpansionPanels({ classworks }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {classworks?.map((classwork, i) => {
        const {
          _id,
          title,
          description,
          topic,
          students,
          schedule,
        } = classwork;
        return (
          <div key={_id}>
            <ExpansionPanel
              expanded={expanded === `panel${i + 1}`}
              onChange={handleChange(`panel${i + 1}`)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${i + 1}bh-content`}
                id={`panel${i + 1}bh-header`}
              >
                <Typography className={classes.heading}>
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
                    {dropMenu.map((option) => (
                      <MenuItem key={option} onClick={handleClose}>
                        {' '}
                        {option}{' '}
                      </MenuItem>
                    ))}
                  </Menu>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {topic} - {title}{' '}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.description}>
                <Typography>Description: {description}</Typography>
              </ExpansionPanelDetails>
              <ExpansionPanelDetails className={classes.footer}>
                <Typography>Students: {students.length}</Typography>
                <Typography>Schedule: {schedule}</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        );
      })}
    </div>
  );
}
