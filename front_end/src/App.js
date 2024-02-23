import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

function App() {
  const [validUser, setValidUser] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const API = `http://localhost:4000`;
      const response = await axios.post(`${API}/login`, {email, password});
      if(response.status === 200) {
        console.log(response);
      }
      else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    }
    catch(error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Grid container style={{ height: '100vh', margin: '2px', overflow: 'hidden' }}>
      <Grid item xs={6} style={{ backgroundColor: 'blue', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4">TASKLY</Typography>
        <Typography variant="h3">Welcome Back</Typography>
      </Grid>
      {validUser === 0 ? (
      <Grid item xs={6} style={{ backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper style={{ maxWidth: '80vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5">SIGNUP</Typography>
          <TextField label="Email" variant="outlined" style={{ borderRadius: 8, width: '80%', padding: '5px' }} value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password" type="password" variant="outlined" style={{ borderRadius: 8, width: '80%', padding: '5px' }} value={password} onChange={(event) => setPassword(event.target.value)}/>
          <Button variant="contained" style={{ borderRadius: 8, backgroundColor: '#007bff', color: 'white', marginTop: 16 }} onClick={handleLogin}>
            Sign Up
          </Button>
          <Button variant="h6" onClick={() => setValidUser(1)} >Already a user</Button>
          {errorMessage && <Typography variant="caption" color="error">{errorMessage}</Typography>}
        </Paper>
      </Grid>
       ) : (
      <Grid item xs={6} style={{ backgroundColor: 'white', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper style={{ maxWidth: '80vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h5">LOGIN</Typography>
          <TextField label="Email" variant="outlined" style={{ borderRadius: 8, width: '80%', padding: '5px' }} value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextField label="Password" type="password" variant="outlined" style={{ borderRadius: 8, width: '80%', padding: '5px' }} value={password} onChange={(event) => setPassword(event.target.value)}/>
          <Button variant="contained" style={{ borderRadius: 8, backgroundColor: '#007bff', color: 'white', marginTop: 16 }} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="h6" onClick={() => setValidUser(0)} >Already a user</Button>
          {errorMessage && <Typography variant="caption" color="error">{errorMessage}</Typography>}
        </Paper>
      </Grid>
  )}
    </Grid>
  );
}

export default App;
