import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleContinue = (formData) => {
    navigate('/summary', {
      state: {
        form: formData,
        product,
      },
    });
  };

  return (
    <>
      <div className="border p-4 rounded shadow-sm bg-white">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="mt-2 font-semibold">${product.price}</p>
        <p className="text-sm">Stock: {product.stock}</p>
        <button
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
          onClick={() => setOpen(true)}
        >
          Pagar con tarjeta
        </button>
      </div>

      <PaymentModal
        open={open}
        handleClose={() => setOpen(false)}
        onContinue={handleContinue}
      />
    </>
  );
};

export default ProductCard;
