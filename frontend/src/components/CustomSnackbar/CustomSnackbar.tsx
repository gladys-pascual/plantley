import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const CustomSnackbar = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
  }
);

export default CustomSnackbar;
