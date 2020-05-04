import React from 'react';
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '../../auth/avatar/Avatar';
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

export default function Message() {
  const classes = useStyles();

  //check for link in text
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <List className={classes.root}>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <RecordVoiceOverIcon/>
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <span style={{width:'100%',display: 'flex', justifyContent: 'space-between', alignItems: 'flexStart'}}> 
              <span>{`${'Admin'} ${'MessageBot'}`}</span>
              <i style={{fontSize: '12px'}}>{moment(new Date()).calendar()}</i>
              </span>
              <Divider/>
            </>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
              <Card className={classes.cardRoot}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                   Hello there! Welcome to My IronSchool app.
                  </Typography>
                  
                  <Typography variant="body2" component="p">
                    Here is message bot example by 
                    <br />
                    <b>"Admin"</b>
                  </Typography>
                <TelegramIcon/>{' '}
                Follow me on GitHub: <a href='https://github.com/alforsii'>https://github.com/alforsii</a>
                <Divider/>
                <ul>
                  <li>You can use this app for FREE</li>
                  <li>For Teachers,Students and Parents!</li>
                  <li> Teachers can:
                    <li>Create, Update and Remove classes,students and even parent</li>
                    <li>Invite parents and add students to the class</li>
                    <li>Check students activities</li>
                    <li>Share students activities with parents</li>
                    <li>Keep in touch with you students,co-teachers and even with parents</li>
                   </li>
                  <li>Do your classwork here and enjoy my cool School app</li>
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

