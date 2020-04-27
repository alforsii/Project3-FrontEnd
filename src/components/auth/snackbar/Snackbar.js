import React from 'react';
// import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickVariant('success')}>Add to class</MenuItem>
      {/* <Button onClick={handleClickVariant('success')}>Add to class</Button> */}
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}
