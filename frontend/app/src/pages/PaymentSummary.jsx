import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PaymentSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const baseFee = 5.0;
  const deliveryFee = 7.0;

  useEffect(() => {
    if (!state || !state.form || !state.product) {
      navigate('/'); // redirigir si no hay datos
    }
  }, [state, navigate]);

  if (!state) return null;

  const { form, product } = state;
  const total = Number(product.price) + baseFee + deliveryFee;

  const handleGoToCheckout = () => {
    navigate('/checkout', {
      state: { form, product },
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Resumen de pago</h2>
      <p><strong>Producto:</strong> {product.name}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Base fee:</strong> ${baseFee}</p>
      <p><strong>Envío:</strong> ${deliveryFee}</p>
      <p className="mt-2 text-lg font-bold">Total: ${total.toFixed(2)}</p>

      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        onClick={handleGoToCheckout}
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Confirmar y pagar'}
      </button>
    </div>
  );
};

export default PaymentSummary;
