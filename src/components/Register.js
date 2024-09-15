import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { name, email, password });
            if (response.status === 200) {
                navigate('/login'); // Redirigir a la página de login
            }
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed, please try again.');
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
                Register
            </Typography>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <TextField
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    name="name"
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    name="email"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    name="password"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Register
                </Button>
            </form>
        </Box>
    );
};

export default Register;
