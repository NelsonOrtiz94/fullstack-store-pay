import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function CheckoutConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    if (!state || !state.form || !state.product) {
      return;
    }

    const processPayment = async () => {
      try {
        console.log('💳 Enviando a backend desde confirm:', {
          form: state.form,
          product: state.product,
        });

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

        window.location.href = checkoutUrl;
      } catch (error) {
        console.error(error);
        alert('Error al procesar el pago.');
        navigate('/');
      }
    };

    processPayment();
  }, [state, navigate]);

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const referenceParam = searchParams.get('reference');

    setStatus(statusParam ?? 'UNKNOWN');
    setReference(referenceParam ?? '');
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          {status === 'APPROVED' ? '✅ Pago aprobado' : status === 'DECLINED' ? '❌ Pago rechazado' : 'ℹ️ Estado desconocido'}
        </h1>
        <p className="text-gray-700 mb-2">
          Referencia de transacción:
        </p>
        <p className="text-blue-600 font-mono font-semibold">{reference}</p>

        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Volver a la tienda
        </a>
      </div>
    </div>
  );
}
