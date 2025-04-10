import { useState } from 'react';

export default function ConfirmAndPayButton({ productId, customer }) {
  const [loading, setLoading] = useState(false);

  const handleConfirmAndPay = async () => {
    try {
      setLoading(true);

      // 1. Crear transacción en backend
      const createResponse = await fetch('http://localhost:3000/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          postalCode: customer.postalCode,
          country: customer.country || 'Colombia',
          productId,
        }),
      });

      const created = await createResponse.json();
      const transactionId = created.id;

      // 2. Solicitar URL de pago de Wompi
      const checkoutResponse = await fetch(`http://localhost:3000/transaction/${transactionId}/checkout`, {
        method: 'POST',
      });

      const checkout = await checkoutResponse.json();

      // 3. Redirigir al formulario de pago de Wompi
      window.location.href = checkout.checkoutUrl;
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un problema al iniciar el proceso de pago. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleConfirmAndPay}
      disabled={loading}
      className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
    >
      {loading ? 'Procesando...' : 'Confirmar y pagar'}
    </button>
  );
}
