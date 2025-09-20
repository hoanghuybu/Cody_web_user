import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import BlogPage from './pages/BlogPage';
import BrandStoryPage from './pages/BrandStoryPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  ///Main Route
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
