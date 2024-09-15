import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../api/axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            onLogin();
        } catch (error) {
        }
    };

    return (
        <Box
            sx={{
                width: 300,
                margin: 'auto',
                marginTop: '50px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Login
                </Button>
            </form>
        </Box>
    );
};

export default Login;
