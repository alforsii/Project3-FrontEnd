import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '5px 0',
      // marginTop: '10px'
    },
    tabs: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tab: {
        width: '33%',
    }
  }));

export default function DisabledTabs({getUsers, toggleSearchBar, updateState, toggleClassNavDropdown}) {
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
        aria-label="tabs example"
      >
        <Tab className={classes.tab} onClick={toggleSearchBar} label="Search" />
        <Tab className={classes.tab} onClick={() => updateState({navigate: 'classrooms'})}  label="Classrooms" />
        <Tab className={classes.tab} onClick={() => updateState({navigate: 'archive'})}  label="Archives" />
      </Tabs>
    </Paper>
   </div>
  );
}
