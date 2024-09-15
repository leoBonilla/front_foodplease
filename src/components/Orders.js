import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import axios from '../api/axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/orders');
                setOrders(response.data.orders);
            } catch (error) {
                console.log('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Box sx={{ width: '80%', margin: 'auto', marginTop: '50px' }}>
            <Typography variant="h4" gutterBottom>
                Your Orders
            </Typography>
            <Paper elevation={3} sx={{ padding: '20px' }}>
                <List>
                    {orders.map((order) => (
                        <ListItem key={order.id} divider>
                            <ListItemText
                                primary={`Product: ${order.product}`}
                                secondary={`Quantity: ${order.quantity}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Orders;
