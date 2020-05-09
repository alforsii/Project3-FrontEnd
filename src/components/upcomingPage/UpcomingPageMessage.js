import React from 'react';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '70px',
    // maxWidth: '70ch',
    backgroundColor: theme.palette.background.paper,
  },
  cardRoot: {
    minWidth: 275,
  },
  inline: {
    display: 'inline',
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function UpcomingPageMessage() {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <RecordVoiceOverIcon />
        </ListItemAvatar>
        <ListItemText
          primary={
            <span>
              <span
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flexStart',
                }}
              >
                <span>{`${'MessageBot'}`}</span>
                <i style={{ fontSize: '12px' }}>
                  {moment(new Date()).calendar()}
                </i>
              </span>
            </span>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              ></Typography>
              <Card className={classes.cardRoot}>
                <CardContent>
                  {/* <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Hello there! Welcome to IronSchool app.
                  </Typography> */}
                  <Typography variant="body2" component="p">
                    Sorry, this page is coming soon and it is not ready currently. But
                    for now you do some other thing.<br/> Read for details below
                    message. <br/>Thanks and have a fun 😊!
                    <br />
                    <b>"Admin"</b>
                  </Typography>
                  <TelegramIcon /> Follow me on GitHub:{' '}
                  <a href="https://github.com/alforsii">
                    https://github.com/alforsii
                  </a>
                  <Divider />
                  <ul>
                    <li>
                      You can use this app absolutely for FREE
                      <span
                        style={{ fontSize: '20px' }}
                        role="img"
                        aria-label="emoji"
                      >
                        😀
                      </span>{' '}
                    </li>
                      <li>Create, Update and Remove classes as you wish</li>
                      <li>Connect with Teachers and Students!</li>
                      <b>On feature version which is coming soon Teachers can:</b>
                    <ul>
                      {' '}
                    <li>Connect with even Parents!</li>
                      <li>Invite parents and add students to the class</li>
                      <li>Share students activities with parents</li>
                      <li>And much more...</li>
                    </ul>
                    <li>
                      Do your classworks here and enjoy my ironSchool app ✨
                    </li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
