import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px',
    marginTop: '10px',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    width: '25%',
  },
}));

export default function DisabledTabs({ switchDefaultPage }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          className={classes.tabs}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab
            className={classes.tab}
            onClick={() => switchDefaultPage('posts')}
            label="Posts"
          />
          <Tab
            className={classes.tab}
            onClick={() => switchDefaultPage('works')}
            label="Tasks"
          />
          <Tab
            className={classes.tab}
            onClick={() => switchDefaultPage('users')}
            label="People"
          />
          <Tab
            className={classes.tab}
            onClick={() => switchDefaultPage('albums')}
            label="Albums"
          />
        </Tabs>
      </Paper>
    </div>
  );
}
