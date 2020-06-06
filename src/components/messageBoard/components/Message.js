import React from 'react';
import moment from 'moment';

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
import CardContent from '@material-ui/core/CardContent';

import MessageDropdown from './MessageDropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',

    width: '100%',
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

export default function Message({
  path,
  firstName,
  lastName,
  msg: { title, header, message, createdAt },
}) {
  const classes = useStyles();

  //check for link in text
  function validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={firstName} src={path} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <span
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{`${firstName} ${lastName}`}</span>
                <i style={{ fontSize: '12px' }}>
                  {moment(createdAt).calendar()}
                </i>
                <MessageDropdown />
              </span>
              <Divider />
            </>
          }
          secondary={
            <Card className={classes.cardRoot}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <>
                    {title.split(' ').map((text, i) =>
                      validURL(text) ? (
                        <a
                          href={text}
                          key={`${Math.random() * 999 + 99 + 'kk' + i}`}
                        >
                          {text}
                        </a>
                      ) : (
                        <span key={`${Math.random() * 999 + 99 + 'kk' + i}`}>
                          {text}
                        </span>
                      )
                    )}
                  </>
                </Typography>
                <Typography variant="body2" component="p">
                  <b>
                    {header.split(' ').map((text, i) =>
                      validURL(text) ? (
                        <a
                          href={text}
                          key={`${Math.random() * 999 + 99 + 'kk' + i}`}
                        >
                          {text}
                        </a>
                      ) : (
                        <span key={`${Math.random() * 999 + 99 + 'kk' + i}`}>
                          {text}
                        </span>
                      )
                    )}
                  </b>
                </Typography>
                <Divider />
                <TelegramIcon />
                <>
                  {message.split(' ').map((text, i) =>
                    validURL(text) ? (
                      <a
                        href={text}
                        key={`${Math.random() * 999 + 99 + 'kk' + i}`}
                      >
                        {text}
                      </a>
                    ) : (
                      <span key={`${Math.random() * 999 + 99 + 'kk' + i}`}>
                        {text}
                      </span>
                    )
                  )}
                </>
              </CardContent>
            </Card>
          }
        />
      </ListItem>
    </List>
  );
}
