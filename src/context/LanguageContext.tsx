import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provide a broad index signature so we can safely access by dynamic string key
type TranslationDict = Record<string, string>;
const translations: Record<Language, TranslationDict> = {
  en: {
  // Auth
  'auth.login': 'LOGIN',
    // Header
    'nav.shop': 'SHOP',
    'nav.culture': 'EXPLORE CULTURE',
    'nav.home': 'HOME',
    'nav.special': 'SPECIAL EDITION',
    
    // Hero Section
    'hero.title': 'CODY',
    'hero.subtitle': 'COCONUT CANDY FROM BEN TRE',
    'hero.description': 'HANDCRAFTED • SUSTAINABLE • AUTHENTIC',
    'hero.explore': 'EXPLORE NOW',
    'hero.special': 'WHAT MAKES US SPECIAL?',
    
    // Products Section
    'products.homemade': 'Homemade',
    'products.title': 'AT CODY VIETNAM',
    'products.subtitle': 'DISCOVER OUR BEST SELLERS',
    'products.original': 'ORIGINAL COCONUT CANDY',
    'products.durian': 'DURIAN COCONUT CANDY',
    'products.durianPeanut': 'DURIAN PEANUT COCONUT CANDY',
    'products.mixBox': 'MIX THREE FLAVOR BOX',
    'products.shopFull': 'SHOP FULL MENU',
    'products.coffee': 'COFFEE COCONUT CANDY',
    'products.strawberry': 'STRAWBERRY COCONUT CANDY',
    'products.chocolate': 'CHOCOLATE COCONUT CANDY',
    'products.mango': 'MANGO COCONUT CANDY',
    'products.pandan': 'PANDAN COCONUT CANDY',
    'products.giftSet': 'PREMIUM GIFT SET',
    
    // Customization Section
    'custom.title': 'ARE YOU CELEBRATING A SPECIAL EVENT?',
    'custom.subtitle': 'TELL US ABOUT YOUR IDEA\nAND WE WILL BAKE IT',
    'custom.personalizedGift': 'Personalized Gift',
    'custom.customizeStickers': 'customize stickers',
    'custom.learnMore': 'learn more',
    
    // Workshop Section
    'workshop.title': 'YOUR GATEWAY TO BECOMING A\nREFINED CULTURAL INSIDER',
    'workshop.description1': 'JOIN OUR COCONUT CANDY MAKING WORKSHOP IN BEN TRE —\nWHERE YOU WILL LEARN TO MAKE VIETNAM\'S TRADITIONAL SWEET\nWITH GUIDANCE FROM LOCAL ARTISANS.',
    'workshop.description2': 'FROM SELECTING COCONUTS, COOKING, SHAPING, TO PACKAGING,\nYOU WILL UNDERSTAND THE ENTIRE PROCESS BEHIND\nTHIS TRADITIONAL HANDICRAFT.',
    'workshop.description3': 'AN INTERESTING, RELAXING EXPERIENCE THAT BRINGS YOU CLOSER\nTO LOCAL CULTURE — STEP BY STEP IN A SWEET WAY.',
    'workshop.discover': 'DISCOVER',
    
    // About Section
    'about.title': 'MEET THE MIND BEHIND THE\nPROJECT',
    'about.description': 'LE BAO LONG, A BEN TRE NATIVE CURRENTLY STUDYING ABROAD,\nFOUNDED CODY IN 2023 WITH A DEEP LOVE FOR VIETNAMESE CULTURE.\nWITH SUPPORT FROM HIS MOTHER AND LOCAL ARTISANS,\nHE BRINGS THE STORY OF TRADITIONAL COCONUT CANDY\nTO A WIDER AUDIENCE — REIMAGINING HERITAGE\nTHROUGH A MODERN LENS.',
    'about.getToKnow': 'GET TO KNOW',
    
    // Instagram Section
    'instagram.title': 'FIND US ON\nINSTAGRAM',
    'instagram.subtitle': '& SHARE OUR CODY ADVENTURE',
    
    // Footer
    'footer.description': 'Sustainable coconut candy brand from Ben Tre - the coconut land. We are committed to bringing high-quality, environmentally friendly products.',
    'footer.aboutUs': 'ABOUT US',
    'footer.philosophy': 'OUR PHILOSOPHY',
    'footer.candy': 'OUR CANDY',
    'footer.culture': 'EXPLORE CULTURE',
    'footer.gift': 'PERSONALIZED GIFT',
    'footer.mind': 'THE MIND',
    'footer.customerService': 'CUSTOMER SERVICE',
    'footer.faqs': 'FAQs',
    'footer.terms': 'TERMS & CONDITIONS',
    'footer.privacy': 'PRIVACY POLICY',
    'footer.shipping': 'SHIPPING INFO',
    'footer.contact': 'CONTACT US',
    'footer.followUs': 'FOLLOW US',
    'footer.followDescription': 'Follow us to update new products and stories about the sustainable journey from Ben Tre.',
    'footer.copyright': '© 2024 CODY - COCONUT CANDY. ALL RIGHTS RESERVED.',
    
    // Product Card
    'product.addToCart': 'ADD TO CART',
    
    // Common
    'common.currency': 'VND',
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
  },
  vn: {
  // Auth
  'auth.login': 'ĐĂNG NHẬP',
    // Header
    'nav.shop': 'CỬA HÀNG',
    'nav.culture': 'KHÁM PHÁ VĂN HÓA',
    'nav.home': 'TRANG CHỦ',
    'nav.special': 'PHIÊN BẢN ĐẶC BIỆT',
    
    // Hero Section
    'hero.title': 'CODY',
    'hero.subtitle': 'KẸO DỪA TỪ BẾN TRE',
    'hero.description': 'THỦ CÔNG • BỀN VỮNG • CHÍNH GỐC',
    'hero.explore': 'KHÁM PHÁ NGAY',
    'hero.special': 'ĐIỀU GÌ LÀM CHÚNG TÔI ĐẶC BIỆT?',
    
    // Products Section
    'products.homemade': 'Thủ công',
    'products.title': 'TẠI CODY VIỆT NAM',
    'products.subtitle': 'KHÁM PHÁ SẢN PHẨM BÁN CHẠY',
    'products.original': 'KẸO DỪA TRUYỀN THỐNG',
    'products.durian': 'KẸO DỪA SẦU RIÊNG',
    'products.durianPeanut': 'KẸO DỪA SẦU RIÊNG ĐẬU PHỘNG',
    'products.mixBox': 'HỘP BA VỊ',
    'products.shopFull': 'XEM TẤT CẢ SẢN PHẨM',
    'products.coffee': 'KẸO DỪA CÀ PHÊ',
    'products.strawberry': 'KẸO DỪA DÂU TÂY',
    'products.chocolate': 'KẸO DỪA CHOCOLATE',
    'products.mango': 'KẸO DỪA XOÀI',
    'products.pandan': 'KẸO DỪA LÁ DỨA',
    'products.giftSet': 'BỘ QUÀ TẶNG CAO CẤP',
    
    // Customization Section
    'custom.title': 'BẠN ĐANG KỶ NIỆM MỘT SỰ KIỆN ĐẶC BIỆT?',
    'custom.subtitle': 'HÃY NÓI VỀ Ý TƯỞNG CỦA BẠN\nVÀ CHÚNG TÔI SẼ THỰC HIỆN',
    'custom.personalizedGift': 'Quà tặng cá nhân hóa',
    'custom.customizeStickers': 'tùy chỉnh nhãn dán',
    'custom.learnMore': 'tìm hiểu thêm',
    
    // Workshop Section
    'workshop.title': 'CÁNH CỬA ĐỂ TRỞ THÀNH\nNGƯỜI AM HIỂU VĂN HÓA',
    'workshop.description1': 'THAM GIA WORKSHOP LÀM KẸO DỪA THỰC HÀNH TẠI BẾN TRE —\nNƠI BẠN SẼ HỌC CÁCH LÀM MÓN NGỌT TRUYỀN THỐNG CỦA VIỆT NAM\nVỚI SỰ HƯỚNG DẪN TỪ CÁC NGHỆ NHÂN ĐỊA PHƯƠNG.',
    'workshop.description2': 'TỪ VIỆC CHỌN DỪA, NẤU, TẠO HÌNH, ĐẾN GÓI GHÉ,\nBẠN SẼ HIỂU RÕ TOÀN BỘ QUY TRÌNH ĐẰNG SAU\nNGHỀ THỦ CÔNG TRUYỀN THỐNG NÀY.',
    'workshop.description3': 'MỘT TRẢI NGHIỆM THÚ VỊ, THƯ GIÃN GIÚP BẠN GẦN GŨI HỚN\nVỚI VĂN HÓA ĐỊA PHƯƠNG — TỪNG BƯỚC MỘT CÁCH NGỌT NGÀO.',
    'workshop.discover': 'KHÁM PHÁ',
    
    // About Section
    'about.title': 'GẶP GỠ TÂM HỒN\nCỦA DỰ ÁN',
    'about.description': 'LÊ BẢO LONG, NGƯỜI BẾN TRE HIỆN ĐANG HỌC TẬP Ở NƯỚC NGOÀI,\nTHÀNH LẬP CODY NĂM 2023 VỚI TÌNH YÊU SÂU SẮC DÀNH CHO VĂN HÓA VIỆT NAM.\nVỚI SỰ HỖ TRỢ TỪ MẸ VÀ CÁC NGHỆ NHÂN ĐỊA PHƯƠNG,\nANH MANG CÂU CHUYỆN VỀ KẸO DỪA TRUYỀN THỐNG\nĐẾN VỚI KHÁN GIẢ RỘNG LỚN — TÁI HIỆN DI SẢN\nQUA GÓCS NHÌN HIỆN ĐẠI.',
    'about.getToKnow': 'TÌM HIỂU THÊM',
    
    // Instagram Section
    'instagram.title': 'TÌM CHÚNG TÔI TRÊN\nINSTAGRAM',
    'instagram.subtitle': '& CHIA SẺ HÀNH TRÌNH CODY',
    
    // Footer
    'footer.description': 'Thương hiệu kẹo dừa bền vững từ Bến Tre - xứ dừa. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, thân thiện với môi trường.',
    'footer.aboutUs': 'VỀ CHÚNG TÔI',
    'footer.philosophy': 'TRIẾT LÝ CỦA CHÚNG TÔI',
    'footer.candy': 'KẸO CỦA CHÚNG TÔI',
    'footer.culture': 'KHÁM PHÁ VĂN HÓA',
    'footer.gift': 'QUÀ TẶNG CÁ NHÂN HÓA',
    'footer.mind': 'TÂM HỒN',
    'footer.customerService': 'DỊCH VỤ KHÁCH HÀNG',
    'footer.faqs': 'CÂU HỎI THƯỜNG GẶP',
    'footer.terms': 'ĐIỀU KHOẢN & ĐIỀU KIỆN',
    'footer.privacy': 'CHÍNH SÁCH BẢO MẬT',
    'footer.shipping': 'THÔNG TIN VẬN CHUYỂN',
    'footer.contact': 'LIÊN HỆ',
    'footer.followUs': 'THEO DÕI CHÚNG TÔI',
    'footer.followDescription': 'Theo dõi chúng tôi để cập nhật những sản phẩm mới và câu chuyện về hành trình bền vững từ Bến Tre.',
    'footer.copyright': '© 2024 CODY - KẸO DỪA. BẢN QUYỀN THUỘC VỀ CHÚNG TÔI.',
    
    // Product Card
    'product.addToCart': 'THÊM VÀO GIỎ',
    
    // Common
    'common.currency': 'VND',
    'common.readMore': 'Đọc tiếp',
    'common.learnMore': 'Tìm hiểu thêm',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};