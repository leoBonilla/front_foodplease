import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Orders from './components/Orders';
import CreateOrder from './components/CreateOrder';
import Navbar from './components/NavBar';
import OrderDetail from './components/OrderDetail';
import { Box } from '@mui/material';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Box sx={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/orders" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/orders" />} />
                    <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/orders" />} />
                    <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/login" />} />
                    <Route path="/create-order" element={isLoggedIn ? <CreateOrder /> : <Navigate to="/login" />} />
                    <Route path="/order-detail/:orderId" element={isLoggedIn ? <OrderDetail /> : <Navigate to="/login" />} />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
