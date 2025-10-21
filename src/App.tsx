import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { WishlistProvider } from './context/WishlistContext';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import BrandStoryPage from './pages/BrandStoryPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import CustomPage from './pages/CustomPage';
import HomePage from './pages/HomePage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutInfoPage from './pages/CheckOutInfoPage';
import WishlistPage from './pages/WishlistPage';

function App() {
  ///Main Route
  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/custom" element={<CustomPage />} />
                <Route path="/products/:category" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/brand-story" element={<BrandStoryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/order/:orderId" element={<OrderDetailPage />} />
<Route path="/checkout-info" element={<CheckoutInfoPage />} />
              </Routes>
            </main>
            <Footer />
            <CartDrawer />
            <Chatbot />
          </div>
        </Router>
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
