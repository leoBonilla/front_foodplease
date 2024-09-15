import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../api/axios';

const CreateOrder = () => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/orders', { product, quantity });
            alert('Order created successfully!');
        } catch (error) {
            alert('Failed to create order!');
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
                Create Order
            </Typography>
            <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <TextField
                    label="Product"
                    variant="outlined"
                    margin="normal"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                />
                <TextField
                    label="Quantity"
                    variant="outlined"
                    margin="normal"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    type="number"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    Create Order
                </Button>
            </form>
        </Box>
    );
};

export default CreateOrder;
