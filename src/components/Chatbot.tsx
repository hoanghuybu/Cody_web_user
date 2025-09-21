/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bot, MessageCircle, Send, User, X } from 'lucide-react';
import { useState } from 'react';
import { chatbotQuery, ChatbotResponse } from '../services/chatbotService';

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  response_type?: 'text' | 'image' | 'list';

  data?: any;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'Xin chào! Tôi là trợ lý ảo của CODY. Tôi có thể giúp bạn tìm hiểu về sản phẩm và đơn hàng. Hãy hỏi tôi nhé!',
      isBot: true,
      timestamp: new Date(),
      response_type: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickResponses = [
    'Giá kẹo dừa truyền thống là bao nhiêu?',
    'Thành phần của kẹo dừa sầu riêng',
    'Trạng thái đơn hàng ORD12345',
    'Hình ảnh kẹo dừa cà phê',
  ];

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
      response_type: 'text' as const,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call chatbot API
      const response: ChatbotResponse = await chatbotQuery({
        question: messageText,
      });

      // Add bot response
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: response.message || 'Xin lỗi, tôi không thể trả lời câu hỏi này.',
        isBot: true,
        timestamp: new Date(),
        response_type: response.response_type,
        data: response.data,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
        isBot: true,
        timestamp: new Date(),
        response_type: 'text',
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: ChatMessage) => {
    if (message.response_type === 'image' && message.data?.image) {
      return (
        <div className="space-y-2">
          <p className="text-sm">{message.text}</p>
          <img
            src={message.data.image}
            alt={message.data.name || 'Product image'}
            className="max-w-48 rounded-lg shadow-sm"
          />
        </div>
      );
    }

    if (message.response_type === 'list' && message.data) {
      return (
        <div className="space-y-2">
          <p className="text-sm">{message.text}</p>
          <ul className="text-sm space-y-1">
            {message.data.ingredients &&
              message.data.ingredients.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-green mr-2">•</span>
                  {item}
                </li>
              ))}
            {message.data.items &&
              message.data.items.map((item: any, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-green mr-2">•</span>
                  {item.name} - SL: {item.quantity} - Giá:{' '}
                  {item.price.toLocaleString('vi-VN')}đ
                </li>
              ))}
          </ul>
        </div>
      );
    }

    return <p className="text-sm whitespace-pre-line">{message.text}</p>;
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
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary-green text-white p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
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
                className={`flex items-start space-x-2 ${
                  message.isBot
                    ? 'justify-start'
                    : 'justify-end flex-row-reverse space-x-reverse'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot
                      ? 'bg-primary-green text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>

                {/* Message bubble */}
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                      : 'bg-primary-green text-white rounded-tr-none'
                  }`}
                >
                  {renderMessage(message)}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start space-x-2 justify-start">
                <div className="w-8 h-8 bg-primary-green text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg rounded-tl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Responses */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">
                  Bạn có thể hỏi:
                </p>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="w-full text-left p-2 text-xs bg-cream hover:bg-primary-green/10 rounded-lg transition-colors"
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
                onKeyPress={(e) =>
                  e.key === 'Enter' && !isLoading && handleSendMessage()
                }
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => !isLoading && handleSendMessage()}
                disabled={isLoading}
                className="w-10 h-10 bg-primary-green text-white rounded-full flex items-center justify-center hover:bg-primary-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
