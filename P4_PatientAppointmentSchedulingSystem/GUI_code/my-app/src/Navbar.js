import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar>
     
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
        <Button color="inherit" href="/">
        Hospital Management
        </Button>
         
        </Typography>
        <Button color="inherit" href="/patient">Patient</Button>
        <Button color="inherit" href="/insurance">Insurance</Button>
        <Button color="inherit" href="/hospital">Hospital</Button>
        <Button color="inherit" href="/department">Department</Button>
        <Button color="inherit" href="/doctor">Doctor</Button>
        <Button color="inherit" href="/holiday">Holiday</Button>
        <Button color="inherit" href="/appointment">Appointment</Button>
        <Button color="inherit" href="/report">Report</Button>
        <Button color="inherit" href="/prescription">Prescription</Button>
        <Button color="inherit" href="/billing">Billing</Button>
        <Button color="inherit" href="/test">Test</Button>
        <Button color="inherit" href="/room">Room</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
