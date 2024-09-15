import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from "../api/axios";

const OrderDetail = () => {
    const { orderId } = useParams(); 
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/order/${orderId}`);
                console.log(response);
                setOrder(response.data.order);
            } catch (error) {
                console.error('Error al obtener los detalles del pedido:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return <Typography>Cargando detalles del pedido...</Typography>;
    }

    // Calcular el total a pagar sumando los totales de cada producto
    const totalAPagar = order.products.reduce((total, product) => {
        return total + (product.pivot.quantity * product.price);
    }, 0);

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Detalles del Pedido #{order.id}</Typography>
            
            {/* Muestra los productos de la orden */}
            <List>
                {order.products.map((product) => (
                    <ListItem key={product.id}>
                        <ListItemText
                            primary={`Producto: ${product.name}`}
                            secondary={`Cantidad: ${product.pivot.quantity} - Precio por unidad: $${product.price} - Total: $${(product.pivot.quantity * product.price).toFixed(2)}`}
                        />
                    </ListItem>
                ))}
            </List>
            
            <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Total a Pagar: ${totalAPagar.toFixed(2)}
            </Typography>

            <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Estado del Pedido: {order.status ? 'Completado' : 'Pendiente'}
            </Typography>

            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/orders')} 
                sx={{ marginTop: '20px' }}
            >
                Volver a pedidos
            </Button>
        </Box>
    );
};

export default OrderDetail;
