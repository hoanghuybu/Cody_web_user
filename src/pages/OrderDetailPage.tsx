import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthUtils } from '../utils/auth';
import Toast from '../components/Toast';

interface OrderDetail {
  orderId: string;
  totalPrice: number;
  note: string;
  isCombo: boolean;
  addressUrl: string;
  status: { 
    name: string;
    vietnamese: string;
  };
  deliveryStatus: {
    name: string;
    vietnamese: string;
  };
  paymentStatus: {
    name: string;
    vietnamese: string;
  };
  items: Array<{
    product: {
      id: string;
      name: string;
      slug: string;
      images: Array<{
        id: string;
        imageUrl: string;
        isMain: boolean;
      }>;
    };
    quantity: number;
    price: number;
  }>;
  buyer: {
    id: string;
    name: string;
    buyerPhone: string;
  };
}

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setToast({ open: true, type, title, message });
  };

  useEffect(() => {
    if (!orderId) return;
    
    const token = AuthUtils.getAccessToken();
    
    fetch(`https://www.cody-be.online/api/v1/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Order data:', data.data); // Debug log
        setOrder(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  // Handle cancel order
  const handleCancelOrder = async () => {
    setShowCancelModal(false);
    setCancelling(true);
    
    const token = AuthUtils.getAccessToken();
    
    try {
      const res = await fetch(`https://www.cody-be.online/api/v1/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        showToast('success', 'Hủy đơn hàng thành công', 'Đơn hàng của bạn đã được hủy.');
        // Reload order data to get updated status
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        const data = await res.json();
        showToast('error', 'Hủy đơn hàng thất bại', data?.message || 'Không thể hủy đơn hàng này.');
      }
    } catch (err) {
      showToast('error', 'Có lỗi xảy ra', 'Vui lòng thử lại sau.');
    } finally {
      setCancelling(false);
    }
  };

  // Check if order can be cancelled
  const canCancelOrder = () => {
    if (!order) return false;
    // Only allow cancel if order is pending/processing (not delivered or cancelled)
    const status = order.deliveryStatus.name.toLowerCase();
    return status === 'pending' || status === 'processing' || status === 'confirmed';
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-warm-brown mb-6 text-center font-playfair">
          Chi tiết đơn hàng
        </h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
            <p className="mt-4 text-gray-600">Đang tải chi tiết đơn hàng...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold">Có lỗi xảy ra</p>
            <p className="text-red-500 text-sm mt-2">{error}</p>
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Order Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-warm-brown">
                    Mã đơn hàng: <span className="text-primary-green">{order.orderId}</span>
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">
                    {order.totalPrice.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>
              
              {/* Status badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {order.deliveryStatus.vietnamese}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {order.paymentStatus.vietnamese}
                </span>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-warm-brown mb-4 flex items-center text-lg">
                <svg className="w-5 h-5 mr-2 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Thông tin cá nhân</span>
                <span className="text-gray-400 font-normal text-sm ml-2">/ Personal Information</span>
              </h3>
              
              <div className="space-y-3">
                {/* Customer Name */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Tên khách hàng:</p>
                    <p className="text-gray-900 font-medium">{order.buyer?.name || 'N/A'}</p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Địa chỉ giao hàng:</p>
                    <p className="text-gray-900">{order.addressUrl}</p>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Số điện thoại:</p>
                    <p className="text-gray-900 font-medium">{order.buyer?.buyerPhone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Note (if exists) */}
            {order.note && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-warm-brown mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Ghi chú đơn hàng
                </h3>
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <p className="text-gray-700 italic">"{order.note}"</p>
                </div>
              </div>
            )}

            {/* Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-warm-brown mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Sản phẩm ({order.items.length})
              </h3>
              
              <div className="space-y-4">
                {order.items.map((item, idx) => {
                  const mainImage = item.product.images.find(img => img.isMain) || item.product.images[0];
                  return (
                    <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                      {/* Product Image */}
                      <img 
                        src={mainImage?.imageUrl || '/placeholder.jpg'} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      {/* Product Info */}
                      <div className="flex-1">
                        <h4 className="font-medium text-warm-brown">{item.product.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Số lượng: <span className="font-semibold text-gray-700">{item.quantity}</span>
                        </p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-amber-600">
                          {item.price.toLocaleString('vi-VN')} đ
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-warm-brown">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-amber-600">
                    {order.totalPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/order-success" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay lại danh sách
          </Link>

          {order && canCancelOrder() && (
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={cancelling}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {cancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
            </button>
          )}
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideInUp">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-warm-brown mb-2 font-playfair">
                  Xác nhận hủy đơn hàng
                </h3>
                <p className="text-gray-600 text-sm">
                  Bạn có chắc chắn muốn hủy đơn hàng <span className="font-semibold text-primary-green">#{order?.orderId}</span>?
                </p>
                <p className="text-red-600 text-sm mt-2 font-medium">
                  Hành động này không thể hoàn tác!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng giá trị:</span>
                  <span className="font-semibold text-amber-600">{order?.totalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số sản phẩm:</span>
                  <span className="font-semibold">{order?.items.length} sản phẩm</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleCancelOrder}
                  className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xác nhận hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        <Toast
          open={toast.open}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />
      </div>
    </div>
  );
};

export default OrderDetailPage;
