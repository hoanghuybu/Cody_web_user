
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Order {
  orderId: string;
  totalPrice: number;
  status: { vietnamese: string };
}


const OrderSuccessPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://www.cody-be.online/api/v1/orders/')
      .then(res => res.json())
      .then(data => {
        setOrders(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-green mb-6 text-center">Bạn đã đặt hàng thành công</h1>
        <p className="mb-8 text-center">Cảm ơn bạn đã đặt hàng! Dưới đây là các đơn hàng của bạn:</p>
        {loading ? (
          <div className="text-center">Đang tải đơn hàng...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.orderId} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">Mã đơn hàng: {order.orderId}</div>
                  <div className="text-sm text-gray-600">Tổng tiền: {order.totalPrice?.toLocaleString('vi-VN')} đ</div>
                  <div className="text-sm text-gray-600">Trạng thái: {order.status?.vietnamese}</div>
                </div>
                <Link to={`/order/${order.orderId}`} className="bg-primary-green text-white px-4 py-2 rounded-lg font-semibold">Xem đơn hàng</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderSuccessPage;
