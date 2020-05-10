import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';
import {
  CardContent,
  Collapse,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { red } from '@material-ui/core/colors';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MessageTextField from './MessageTextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import PageMessage from './PageMessage';

const ITEM_HEIGHT = 48;
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  favoriteIcon: {
    color: red[500],
  },
}));

const dropMenu = ['Post', 'Copy', 'Edit', 'Delete'];
export default function DisplayClassworks({ classworks }) {

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

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return classworks?.length > 0 ? (
    <>
      {classworks?.map((classwork, i) => {
        const {
          _id,
          author,
          title,
          description,
          topic,
          students,
          schedule,
          createdAt,
        } = classwork;

        const posted = moment(createdAt).calendar();
        return (
          <Card key={_id} className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {title?.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <div>
                  {author?.firstName} Posted {posted}
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
                        width: '20ch',
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
                </div>
              }
              title={title}
              subheader={posted}
            />
            <ExpansionPanel
              expanded={expanded === `panel${i + 1}`}
              onChange={handleChange(`panel${i + 1}`)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${i + 1}bh-content`}
                id={`panel${i + 1}bh-header`}
              >
                <AvatarGroup max={3}>
                  {students?.map((student) => (
                    <Avatar
                      key={student._id}
                      alt={student.firstName}
                      src={student.path}
                    />
                  ))}
                </AvatarGroup>
              </ExpansionPanelSummary>
              <ExpansionPanelSummary
                aria-controls={`panel${i + 1}bh-desc`}
                id={`panel${i + 1}bh-desc`}
              >
                {schedule && `Due: ${moment(schedule).calendar()} `}
                <br />
                {description && `Description: ${description}`}
              </ExpansionPanelSummary>
            </ExpansionPanel>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Avatar src={author?.path} alt={author?.firstName} />
                <Typography paragraph>
                  Author: {author?.firstName} {author?.lastName}{' '}
                </Typography>

                <Typography paragraph>
                  <h2 style={{ margin: 0, padding: 0 }}>
                    {' '}
                    {topic ? topic : 'No Topic'}{' '}
                  </h2>
                  <MessageTextField />
                </Typography>
                <Typography paragraph>
                  <IconButton
                    edge="end"
                    aria-label="badge"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <Badge badgeContent={3} color="secondary">
                      <CommentIcon />
                    </Badge>
                  </IconButton>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </>
  ) : (
    <PageMessage />
  );
}
