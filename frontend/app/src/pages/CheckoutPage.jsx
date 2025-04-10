import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state || !state.form || !state.product) {
      navigate('/');
      return;
    }

    const processPayment = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: state.form.fullName,
            email: state.form.email,
            phone: state.form.phone,
            address: state.form.address,
            city: state.form.city,
            postalCode: state.form.postalCode,
            country: state.form.country || 'Colombia',
            productId: state.product.id,
          }),
        });

        const transaction = await res.json();

        const checkoutRes = await fetch(`http://localhost:3000/transaction/${transaction.id}/checkout`, {
          method: 'POST',
        });

        const { checkoutUrl } = await checkoutRes.json();

        // Redirigir a Wompi inmediatamente
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error(error);
        alert('Error al procesar el pago.');
        navigate('/');
      }
    };

    processPayment();
  }, [state, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Redirigiendo a Wompi...</h1>
        <p className="text-gray-600">Por favor espera un momento.</p>
      </div>
    </div>
  );
}
