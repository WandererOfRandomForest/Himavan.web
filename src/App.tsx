import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './pages/HomePage';
import ProductGrid from './components/ProductGrid';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paper" element={<ProductGrid category="Paper" />} />
          <Route path="/bagasse" element={<ProductGrid category="Bagasse" />} />
          <Route path="/plastic-free" element={<ProductGrid category="Plastic Free" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;