import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: '20px',
      marginTop: '10px'
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

export default function DisabledTabs({switchDefaultPage}) {
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
        <Tab className={classes.tab} onClick={() => switchDefaultPage('posts')} label="Posts" />
        <Tab className={classes.tab} onClick={() => switchDefaultPage('works')}  label="Classworks" />
        <Tab className={classes.tab} onClick={() => switchDefaultPage('users')}  label="Connections" />
      </Tabs>
    </Paper>
   </div>
  );
}


//Old version
// import React, { useState } from 'react'

// import './ClassNavbar.css'

// export default function ClassNav({switchDefaultPage}) {
//     const [currentPage, setCurrentPage] = useState('2');
//     return (
//         <React.Fragment>
//             <nav className="class-nav">
//                 <button onClick={() => {
//                     setCurrentPage('1')
//                     switchDefaultPage('posts')
//                 }} className={`click-btn2 ${currentPage === '1' && 'focus-on'}`}>Posts</button>
//                 <button onClick={() => {
//                     setCurrentPage('2')
//                     switchDefaultPage('works')
//                 }} className={`click-btn2 ${currentPage === '2' && 'focus-on'}`}>Classworks</button>
//                 <button onClick={() => {
//                     setCurrentPage('3')
//                     switchDefaultPage('users')
//                 }} className={`click-btn2 ${currentPage === '3' && 'focus-on'}`}>Connections</button>
//           </nav>
//         </React.Fragment>
//     )
// }
