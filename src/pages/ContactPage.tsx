import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">{t('contact.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-warm-brown font-playfair mb-6">{t('contact.infoTitle')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-brown mb-1">{t('contact.address')}</h3>
                    <p className="text-gray-600">
                      123 Đường Dừa, Phường An Hòa<br />
                      TP. Bến Tre, Tỉnh Bến Tre
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-brown mb-1">{t('contact.phone')}</h3>
                    <p className="text-gray-600">0275 123 456</p>
                    <p className="text-gray-600">0901 234 567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-light-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-light-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-brown mb-1">{t('contact.email')}</h3>
                    <p className="text-gray-600">hello@cody.vn</p>
                    <p className="text-gray-600">support@cody.vn</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-warm-brown/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-warm-brown" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-brown mb-1">{t('contact.hours')}</h3>
                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                    <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                    <p className="text-gray-600">Chủ nhật: Nghỉ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-warm-brown font-playfair mb-4">{t('contact.follow')}</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-warm-brown font-playfair mb-6">{t('contact.formTitle')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.name')} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.phoneOpt')}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.subject')} *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    >
                      <option value="">{t('contact.subjectChoose')}</option>
                      <option value="product">{t('contact.subjectProduct')}</option>
                      <option value="order">{t('contact.subjectOrder')}</option>
                      <option value="partnership">{t('contact.subjectPartner')}</option>
                      <option value="feedback">{t('contact.subjectFeedback')}</option>
                      <option value="other">{t('contact.subjectOther')}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t('contact.message')} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent resize-none"
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center px-8 py-4 bg-primary-green text-white font-semibold rounded-full hover:bg-primary-green/90 transition-colors group"
                >
                  <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t('contact.send')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-warm-brown font-playfair mb-6">{t('contact.mapTitle')}</h2>
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.8037881604355!2d106.38191831533587!3d10.266612092609593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a82c1de2ca5d%3A0x8e9b24b2b3e8f4a3!2zQuG6v24gVHJl!5e0!3m2!1svi!2s!4v1640000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí CODY tại Bến Tre"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;