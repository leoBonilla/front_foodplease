import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import axios from "../api/axios";
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);  // Estado para manejar el "loading"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);  // Activa el "loading" mientras se obtienen los pedidos
        const response = await axios.get("/orders");
        setOrders(response.data.orders);
      } catch (error) {
        console.log("Failed to fetch orders:", error);
      } finally {
        setLoading(false);  // Desactiva el "loading" cuando se hayan obtenido los pedidos o se produzca un error
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (products) => {
    return products.reduce((total, product) => {
      return total + (product.pivot.quantity * product.price);
    }, 0).toFixed(2);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mis Pedidos
      </Typography>

      {/* Muestra el "loading" mientras los pedidos están siendo cargados */}
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem
              key={order.id}
              divider
              component={Link}
              to={`/order-detail/${order.id}`}
              button
            >
              <ListItemText
                primary={`Pedido #${order.id}`}
                secondary={`Fecha: ${new Date(order.created_at).toLocaleDateString()} - Total a pagar: $${calculateTotal(order.products)}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Orders;
