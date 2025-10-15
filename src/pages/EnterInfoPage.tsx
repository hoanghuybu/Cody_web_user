import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUtils } from '../utils/auth';

const EnterInfoPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [authReady, setAuthReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is authenticated, prefill name from saved user info and show form
    if (AuthUtils.isAuthenticated()) {
      const u = AuthUtils.getUserInfo();
      if (u) setName(u.firstName ? `${u.lastName} ${u.firstName}` : u.name || '');
      setAuthReady(true);
      return;
    }

    // If not authenticated, open auth modal and wait for auth-success
    const openEvent = new CustomEvent('open-auth', { detail: { mode: 'signin' } });
    window.dispatchEvent(openEvent);

    const handler = () => {
      const u = AuthUtils.getUserInfo();
      if (u) setName(u.firstName ? `${u.lastName} ${u.firstName}` : u.name || '');
      setAuthReady(true);
    };
    window.addEventListener('auth-success', handler as EventListener);
    return () => window.removeEventListener('auth-success', handler as EventListener);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInfo = { name, phone, address };
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-primary-green mb-6 text-center">Nhập thông tin cá nhân</h1>
        {authReady ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {name && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <div className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-700">{name}</div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-green text-white font-bold py-3 rounded-lg hover:brightness-110 transition-colors"
            >
              Lưu thông tin và tiếp tục
            </button>
          </form>
        ) : (
          <div className="py-12 text-center">
            <div className="text-lg font-medium text-gray-700">Vui lòng đăng nhập để tiếp tục</div>
            <div className="mt-4 text-sm text-gray-500">Đang mở cửa sổ đăng nhập...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterInfoPage;
