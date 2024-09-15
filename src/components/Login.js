import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import axios, { setLoading } from '../api/axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoadingState] = useState(false);  

    setLoading(setLoadingState);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Realiza la solicitud de login
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            onLogin();  
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
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
            {/* Muestra el "loading" mientras la solicitud está en proceso */}
            {loading ? (
                <CircularProgress />
            ) : (
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
            )}
        </Box>
    );
};

export default Login;
