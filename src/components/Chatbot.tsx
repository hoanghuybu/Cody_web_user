import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của CODY. Tôi có thể giúp gì cho bạn?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickResponses = [
    "Giá sản phẩm như thế nào?",
    "Chính sách vận chuyển",
    "Thành phần sản phẩm",
    "Cách đặt hàng"
  ];

  const botResponses: { [key: string]: string } = {
    "Giá sản phẩm như thế nào?": "Sản phẩm kẹo dừa CODY có giá từ 45.000đ - 350.000đ tùy theo loại và kích cỡ. Bạn có thể xem chi tiết tại trang sản phẩm.",
    "Chính sách vận chuyển": "Chúng tôi miễn phí vận chuyển cho đơn hàng từ 300.000đ trong nội thành. Thời gian giao hàng 1-3 ngày làm việc.",
    "Thành phần sản phẩm": "Kẹo dừa CODY được làm từ 100% dừa tươi Bến Tre, đường mía tự nhiên, không chất bảo quản và phẩm màu nhân tạo.",
    "Cách đặt hàng": "Bạn có thể đặt hàng trực tiếp trên website hoặc liên hệ hotline 0275 123 456. Chúng tôi hỗ trợ thanh toán COD và chuyển khoản."
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: botResponses[messageText] || "Cảm ơn bạn đã liên hệ! Tôi sẽ chuyển câu hỏi cho nhân viên tư vấn để được hỗ trợ tốt nhất.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickResponse = (response: string) => {
    handleSendMessage(response);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary-green text-white rounded-full shadow-lg hover:bg-primary-green/90 transition-all duration-300 z-50 flex items-center justify-center ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary-green text-white p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">Trợ lý CODY</h3>
              <p className="text-xs opacity-80">Trực tuyến</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-primary-green text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {/* Quick Responses */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Câu hỏi thường gặp:</p>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="w-full text-left p-2 text-sm bg-cream hover:bg-primary-green/10 rounded-lg transition-colors"
                  >
                    {response}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="w-10 h-10 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-primary-green/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;