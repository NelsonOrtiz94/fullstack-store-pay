import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import PaymentSummary from './pages/PaymentSummary';
import CheckoutConfirm from './pages/CheckoutConfirm';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/summary" element={<PaymentSummary />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirm" element={<CheckoutConfirm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
