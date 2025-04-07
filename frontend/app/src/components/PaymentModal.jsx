import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    Stack,
  } from '@mui/material';
  import { useState } from 'react';
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  
  const PaymentModal = ({ open, handleClose, onContinue }) => {
    const [form, setForm] = useState({
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = () => {
      // Validación simple
      if (Object.values(form).some((val) => val.trim() === '')) {
        alert('Por favor, completa todos los campos.');
        return;
      }
  
      onContinue(form);
      handleClose(); // cerrar modal
    };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" mb={2}>
            Información de pago y entrega
          </Typography>
  
          <Stack spacing={2}>
            <TextField label="Nombre completo" name="fullName" onChange={handleChange} fullWidth />
            <TextField label="Dirección" name="address" onChange={handleChange} fullWidth />
            <TextField label="Ciudad" name="city" onChange={handleChange} fullWidth />
            <TextField label="Código postal" name="postalCode" onChange={handleChange} fullWidth />
            <TextField label="Número de tarjeta" name="cardNumber" onChange={handleChange} fullWidth />
            <TextField label="Fecha de expiración (MM/AA)" name="expiry" onChange={handleChange} fullWidth />
            <TextField label="CVV" name="cvv" onChange={handleChange} fullWidth />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Continuar con el pago
            </Button>
          </Stack>
        </Box>
      </Modal>
    );
  };
  
  export default PaymentModal;
  