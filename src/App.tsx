import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandStoryPage from './pages/BrandStoryPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import Chatbot from './components/Chatbot';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-cream flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/brand-story" element={<BrandStoryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <Chatbot />
          </div>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;