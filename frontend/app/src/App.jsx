import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import PaymentSummary from './pages/PaymentSummary';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/summary" element={<PaymentSummary />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
