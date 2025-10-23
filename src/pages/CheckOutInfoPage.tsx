import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CheckoutInfoPage = () => {
  const { items, total, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const orderPayload = {
      buyerName: form.name,
      buyerPhone: form.phone,
      addressUrl: form.address,
      paymentMethod: 'COD',
      items: items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      totalPrice: total,
      note: form.note,
    };

    setLoading(true);
    try {
      const res = await fetch(
        'https://www.cody-be.online/api/v1/orders/create',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        }
      );
      const data = await res.json();
      if (res.ok) {
        clearCart();
        const orderId = data?.data?.orderId || data?.orderId;
        navigate(orderId ? `/order/${orderId}` : '/order-success');
      } else {
        alert('Đặt hàng thất bại: ' + data.message);
      }
    } catch (err) {
      alert('Đặt hàng thất bại, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Checkout Form */}
        <div>
          <h1 className="text-3xl font-playfair font-bold text-warm-brown mb-6">
            {t('checkout.title') || 'Thông tin đặt hàng'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green/40"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green/40"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ giao hàng
              </label>
              <textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green/40"
                placeholder="Số nhà, phường/xã, quận/huyện, tỉnh/thành phố"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ghi chú (tuỳ chọn)
              </label>
              <textarea
                rows={2}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green/40"
                placeholder="Ví dụ: Giao buổi sáng, không gọi điện..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-primary-green text-white font-semibold py-3 rounded-full hover:bg-primary-green/90 transition-colors"
            >
              {loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
            </button>

            <div className="text-center mt-6">
              <Link
                to="/cart"
                className="text-sm text-gray-500 hover:text-primary-green"
              >
                ← Quay lại giỏ hàng
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div>
          <h2 className="text-2xl font-playfair font-bold text-warm-brown mb-6">
            Đơn hàng của bạn
          </h2>

          <div className="bg-cream/60 rounded-xl p-6 space-y-4 border border-cream">
            {items.length === 0 ? (
              <p className="text-gray-600 italic">Giỏ hàng trống</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 pb-3"
                >
                  <div>
                    <p className="font-medium text-warm-brown">{item.name}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="font-semibold text-primary-green">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))
            )}

            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Phí giao hàng</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-warm-brown mt-3">
                <span>Tổng cộng</span>
                <span className="text-primary-green">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>Thanh toán khi nhận hàng (COD)</p>
            <p>Đảm bảo 100% kẹo mới sản xuất, giao tận nơi toàn quốc.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInfoPage;
