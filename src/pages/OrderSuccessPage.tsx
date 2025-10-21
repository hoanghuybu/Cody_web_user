
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthUtils } from '../utils/auth';

interface Order {
  orderId: string;
  totalPrice: number;
  deliveryStatus?: {
    name: string;
    vietnamese: string;
  };
  paymentStatus?: {
    name: string;
    vietnamese: string;
  };
  status?: { 
    name: string;
    vietnamese: string;
  };
}

interface PaginationInfo {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

const OrderSuccessPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalElements: 0,
    totalPages: 0,
    size: 5,
    number: 0,
    first: true,
    last: true,
  });
  const [currentPage, setCurrentPage] = useState(0);

  const fetchOrders = (page: number) => {
    setLoading(true);
    const token = AuthUtils.getAccessToken();
    
    fetch(`https://www.cody-be.online/api/v1/orders/?page=${page}&size=5`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // API returns paginated data with content array
        const ordersList = Array.isArray(data.data?.content) ? data.data.content : [];
        setOrders(ordersList);
        setPagination({
          totalElements: data.data?.totalElements || 0,
          totalPages: data.data?.totalPages || 0,
          size: data.data?.size || 5,
          number: data.data?.number || 0,
          first: data.data?.first || true,
          last: data.data?.last || true,
        });
        setLoading(false);
      })
      .catch(err => {
        // Error fetching orders
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-warm-brown mb-2 font-playfair">
            Lịch sử đơn hàng.
          </h1>
          <p className="text-gray-600">
            Trạng thái đơn hàng của bạn có thể được theo dõi trong lịch sử đơn hàng.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
            <p className="mt-4 text-gray-600">Đang tải đơn hàng...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold">Có lỗi xảy ra</p>
            <p className="text-red-500 text-sm mt-2">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">Chưa có đơn hàng nào.</p>
            <Link 
              to="/products" 
              className="inline-block mt-4 px-6 py-2 bg-primary-green text-white rounded-lg font-semibold hover:bg-primary-green/90 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-warm-brown mb-4">
              Đơn hàng của bạn ({pagination.totalElements})
            </h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div 
                  key={order.orderId} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-warm-brown">Mã đơn hàng:</span>
                        <span className="text-primary-green font-mono">{order.orderId}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Tổng tiền:</span>{' '}
                        <span className="text-amber-600 font-semibold text-base">
                          {order.totalPrice?.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      
                      {/* Status badges */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {order.deliveryStatus && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {order.deliveryStatus.vietnamese}
                          </span>
                        )}
                        {order.paymentStatus && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {order.paymentStatus.vietnamese}
                          </span>
                        )}
                        {!order.deliveryStatus && !order.paymentStatus && order.status && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {order.status.vietnamese}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link 
                      to={`/order/${order.orderId}`} 
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-primary-green text-white rounded-lg font-semibold hover:bg-primary-green/90 transition-colors shadow-sm whitespace-nowrap"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={pagination.first}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        pageNum === pagination.number
                          ? 'bg-primary-green text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages - 1, prev + 1))}
                  disabled={pagination.last}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 border-2 border-primary-green text-primary-green rounded-lg font-semibold hover:bg-primary-green hover:text-white transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
