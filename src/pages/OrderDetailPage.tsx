import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface OrderDetail {
  orderId: string;
  totalPrice: number;
  status: { vietnamese: string };
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
}

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`https://www.cody-be.online/api/v1/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [orderId]);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-primary-green mb-6 text-center">Chi tiết đơn hàng</h1>
        {loading ? (
          <div className="text-center">Đang tải chi tiết đơn hàng...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : order ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <div className="font-semibold">Mã đơn hàng: {order.orderId}</div>
              <div className="text-sm text-gray-600">Tổng tiền: {order.totalPrice.toLocaleString('vi-VN')} đ</div>
              <div className="text-sm text-gray-600">Trạng thái: {order.status.vietnamese}</div>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">Thông tin khách hàng</div>
              <div className="text-sm">Tên: {order.customer.name}</div>
              <div className="text-sm">SĐT: {order.customer.phone}</div>
              <div className="text-sm">Địa chỉ: {order.customer.address}</div>
            </div>
            <div>
              <div className="font-semibold mb-2">Sản phẩm</div>
              <ul className="space-y-2">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{item.productName} x {item.quantity}</span>
                    <span>{item.price.toLocaleString('vi-VN')} đ</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <div className="mt-8 text-center">
          <Link to="/order-success" className="bg-primary-green text-white px-4 py-2 rounded-lg font-semibold">Quay lại danh sách đơn hàng</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
