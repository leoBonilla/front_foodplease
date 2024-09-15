import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import axios, { setLoading } from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [quantity, setQuantity] = useState({});
    const [loading, setLoadingState] = useState(false); // Estado para manejar el "loading"
    const navigate = useNavigate();

    // Configura el manejador de "loading" para este componente
    setLoading(setLoadingState);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingState(true);  // Activa el estado de "loading" mientras se cargan los productos
                const response = await axios.get('/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            } finally {
                setLoadingState(false);  // Desactiva el "loading" después de cargar los productos
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = (productId) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.includes(productId)
                ? prevProducts.filter((id) => id !== productId)
                : [...prevProducts, productId]
        );
    };

    const handleQuantityChange = (productId, value) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [productId]: value,
        }));
    };

    const handleCreateOrder = async (e) => {
        e.preventDefault();
        try {
            setLoadingState(true);  // Activa el "loading" mientras se procesa el pedido
            const productData = selectedProducts.map((productId) => ({
                id: productId,
                quantity: quantity[productId] || 1,
            }));

            const response = await axios.post('/orders', { products: productData });
            if (response.status === 201) {
                navigate('/orders');
            }
        } catch (error) {
            alert('Fallo al crear el pedido!');
        } finally {
            setLoadingState(false);  // Desactiva el "loading" al finalizar la solicitud
        }
    };

    return (
        <Box
            sx={{
                width: 400,
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
                Crear Pedido
            </Typography>
            {/* Muestra el "loading" mientras los productos están cargando */}
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {products.map((product) => (
                        <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Box>
                                <Typography>{product.name} - ${product.price}</Typography>
                                <TextField
                                    label="Cantidad"
                                    variant="outlined"
                                    type="number"
                                    InputProps={{ inputProps: { min: 0, max: 4 } }}
                                    value={quantity[product.id] || ''}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    sx={{ width: '100px' }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color={selectedProducts.includes(product.id) ? 'secondary' : 'primary'}
                                onClick={() => handleProductChange(product.id)}
                                sx={{ height: '56px' }} // Alinea el botón con el campo de texto
                            >
                                {selectedProducts.includes(product.id) ? 'Eliminar' : 'Agregar'}
                            </Button>
                        </Box>
                    ))}
                    <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
                        Crear pedido
                    </Button>
                </form>
            )}
        </Box>
    );
};

export default CreateOrder;
