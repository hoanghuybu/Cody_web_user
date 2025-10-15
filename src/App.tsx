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
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderDetailPage from './pages/OrderDetailPage';
import EnterInfoPage from './pages/EnterInfoPage';

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
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/order/:orderId" element={<OrderDetailPage />} />
                <Route path="/enter-info" element={<EnterInfoPage />} />
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
