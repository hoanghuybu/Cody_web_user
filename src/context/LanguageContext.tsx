import React, { createContext, ReactNode, useContext, useState } from 'react';

export type Language = 'en' | 'vn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provide a broad index signature so we can safely access by dynamic string key
type TranslationDict = Record<string, string>;
const translations: Record<Language, TranslationDict> = {
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    // Product Detail
    'productDetail.notFound': 'Product not found',
    'productDetail.backToList': 'Back to product list',
    'productDetail.breadcrumbHome': 'Home',
    'productDetail.breadcrumbProducts': 'Products',
    'productDetail.ingredients': 'Ingredients',
    'productDetail.weight': 'Weight',
    'productDetail.addToCart': 'Add to cart',
    'productDetail.favorite': 'Favorite',
    'productDetail.share': 'Share',
    'productDetail.featureFreeShip': 'Free shipping',
    'productDetail.featureQuality': 'Quality assurance',
    'productDetail.featureNatural': '100% natural',
    'productDetail.related': 'Related Products',
    'productDetail.category': 'Category',
    // Badges
    'badges.new': 'New',
    'badges.bestSeller': 'Best Seller',
    'badges.promo': 'Sale',
    // Product generic
    'product.viewDetail': 'View detail',
    // Product names/descriptions (sample)
    'p.1.name': 'Traditional Coconut Candy',
    'p.1.desc':
      'Pure coconut candy with traditional recipe and natural cane sugar sweetness',
    'p.2.name': 'Mixed Coconut Candy Combo',
    'p.2.desc':
      'Set of 3 flavors: traditional, coffee and durian. Perfect for gifting',
    'p.3.name': 'CODY Tet Gift Box',
    'p.3.desc':
      'Premium gift box with 6 special coconut candy varieties, elegant design',
    'p.4.name': 'Strawberry Coconut Candy',
    'p.4.desc':
      'Perfect blend of coconut sweetness and natural strawberry tartness',
    'p.5.name': 'Coffee Coconut Candy',
    'p.5.desc': 'Rich Arabica coffee flavor infused with coconut sweetness',
    'p.6.name': 'Ben Tre Gift Basket',
    'p.6.desc':
      'Specialties basket from Ben Tre with coconut candy and coconut products',
    // API Product translations
    'p.J3YY-225558.name': 'Ben Tre Grilled Coconut Cake',
    'p.J3YY-225558.desc':
      'Ben Tre specialty grilled coconut cake, made from fresh coconut milk, glutinous rice flour and sugar, crispy and fragrant. Perfect for snacks, tea or as a gift.',
    'p.58V5-232705.name': 'Ben Tre Grilled Coconut Cake 1',
    'p.58V5-232705.desc':
      'Ben Tre specialty grilled coconut cake, made from fresh coconut milk, glutinous rice flour and sugar, crispy and fragrant. Perfect for snacks, tea or as a gift.',
    'p.3tOo-102151.name': 'Test Product Name',
    'p.3tOo-102151.desc': 'Test product description',
    // Ingredients samples
    'i.coconutFresh': 'Fresh Ben Tre coconut',
    'i.caneSugar': 'Natural cane sugar',
    'i.seaSalt': 'Sea salt',
    'i.coffeeArabica': 'Arabica coffee',
    'i.durian': 'Durian',
    'i.premiumSet6': '6 premium candy flavors',
    'i.luxuryBox': 'Luxury gift box',
    'i.strawberryDried': 'Dried strawberry',
    'i.roastedArabica': 'Roasted Arabica coffee',
    'i.codyCandy': 'CODY coconut candy',
    'i.coconutMilk': 'Coconut milk',
    'i.coconutBiscuit': 'Toasted coconut biscuit',
    'i.coconutJam': 'Coconut jam',
    // Products Page
    'products.headerTitle': 'All Products',
    'products.headerSubtitle':
      'Explore our handcrafted coconut candy collection',
    'products.searchPlaceholder': 'Search products...',
    'products.category': 'Category',
    'products.allCategories': 'All categories',
    'products.sortCategories': 'Sort Categories',
    'products.sort': 'Sort by',
    'products.sortName': 'Name (A–Z)',
    'products.sortPriceLow': 'Price: Low to High',
    'products.sortPriceHigh': 'Price: High to Low',
    'products.sortUpdated': 'Recently Updated',
    'products.sortSlug': 'URL Slug (A–Z)',
    'products.activeFilters': 'Active filters',
    'products.searchLabel': 'Search',
    'products.showing': 'Showing {count} products',
    'products.inCategory': 'in category {category}',
    'products.noResultsTitle': 'No products found',
    'products.noResultsSubtitle': 'Try adjusting your filters or search term.',
    'products.createCombo': 'Create Gift Combo',
    // Category names
    'categories.traditional': 'Traditional',
    'categories.premium': 'Premium',
    'categories.combo': 'Combo',
    'categories.gift-box': 'Gift Box',
    'categories.gift-basket': 'Gift Basket',
    // Brand Story
    'brand.heroTitle': 'The Story of',
    'brand.heroSubtitle': 'Where Sweetness Meets Vietnamese Heritage',
    'brand.originTitle': 'Origin from the Coconut Land',
    'brand.originP1':
      "Ben Tre – a land blessed with endless green coconut groves, where the Mekong's waves blend with the whispering leaves. This is where CODY was born.",
    'brand.originP2':
      'With deep love for our homeland and the desire to preserve cultural values, we began a journey to create coconut candy that is both delicious and environmentally friendly.',
    'brand.originP3':
      'Every CODY candy carries the dedication of farmers tending the coconut gardens and the craftsmanship of artisans with decades of experience.',
    'brand.timelineTitle': 'Our Growth Journey',
    'brand.timelineSubtitle':
      'From the first steps to today, we stay true to our mission of quality and sustainability.',
    'brand.milestone1Title': 'Beginning',
    'brand.milestone1Desc':
      'The idea of CODY formed from love for Ben Tre and a desire for sustainable development.',
    'brand.milestone2Title': 'Establishment',
    'brand.milestone2Desc':
      'Officially founded and launched our first small-batch coconut candy.',
    'brand.milestone3Title': 'Expansion',
    'brand.milestone3Desc': 'Diversified products and expanded nationwide.',
    'brand.milestone4Title': 'Green Future',
    'brand.milestone4Desc':
      'Committed to sustainability and becoming a leading Vietnamese coconut candy brand.',
    'brand.valuesTitle': 'Core Values',
    'brand.valuesSubtitle':
      'Principles guiding everything we do and making every product unique.',
    'brand.valueSustain': 'Sustainability',
    'brand.valueSustainDesc':
      'Committed to environmental protection in every operation.',
    'brand.valueQuality': 'Quality',
    'brand.valueQualityDesc': 'Quality first – from ingredients to process.',
    'brand.valueCommunity': 'Community',
    'brand.valueCommunityDesc':
      'Supporting and growing with local coconut farmers.',
    'brand.valueTradition': 'Tradition',
    'brand.valueTraditionDesc':
      'Preserving and elevating traditional Vietnamese candy craftsmanship.',
    'brand.missionTitle': 'Our Mission',
    'brand.missionText':
      "We deliver premium, eco-friendly coconut candy while preserving Ben Tre's traditional craft and promoting sustainable growth for community and planet.",
    'brand.ctaExplore': 'Explore Products',
    'brand.ctaContact': 'Contact Us',
    // Cart
    'cart.title': 'Your Cart',
    'cart.itemsCount': '{count} items in your cart',
    'cart.emptyTitle': 'Your cart is empty',
    'cart.emptySubtitle': 'Discover our delicious coconut candy products',
    'cart.continueShopping': 'Continue Shopping',
    'cart.price': 'Price',
    'cart.quantity': 'Quantity',
    'cart.total': 'Total',
    'cart.decreaseQty': 'Decrease quantity',
    'cart.increaseQty': 'Increase quantity',
    'cart.removeItem': 'Remove item from cart',
    'cart.clearAll': 'Remove all items',
    'cart.freeShipRemain': 'Spend ',
    'cart.freeShipRemainTail': ' more to get FREE shipping! 🛵',
    'cart.freeShipQualified': 'You have qualified for FREE shipping! 🎉',
    'cart.addNote': 'Add a note',
    'cart.noteLabel': 'Order note',
    'cart.notePlaceholder': 'Optional note for your order',
    'cart.noteHelp': 'This note will be sent with your order.',
    'cart.taxShipping': 'Tax included. Shipping calculated at checkout.',
    'cart.checkout': 'Checkout',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.grandTotal': 'Grand Total',
    'cart.drawerEmpty': 'No items yet.',
    'cart.proceedCheckout': 'Proceed to checkout',
    // Contact
    'contact.title': 'Contact CODY',
    'contact.subtitle':
      "We're ready to support you. Reach out for product and service assistance.",
    'contact.infoTitle': 'Contact Information',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.follow': 'Follow us',
    'contact.formTitle': 'Send us a message',
    'contact.name': 'Full name',
    'contact.phoneOpt': 'Phone number',
    'contact.subject': 'Subject',
    'contact.subjectChoose': 'Choose a subject',
    'contact.subjectProduct': 'Product information',
    'contact.subjectOrder': 'Order & payment',
    'contact.subjectPartner': 'Business partnership',
    'contact.subjectFeedback': 'Feedback & complaint',
    'contact.subjectOther': 'Other',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Enter your message...',
    'contact.send': 'Send message',
    'contact.mapTitle': 'Our Location',
    // Auth
    'auth.login': 'LOGIN',
    'auth.loginFailed': 'Login failed',
    'auth.registrationFailed': 'Registration failed',
    'auth.registerFailed': 'Registration failed',
    'auth.userNotFound': 'User not found',
    'auth.emailExists': 'Email already exists',
    'auth.passwordTooWeak': 'Password is too weak',
    'auth.invalidRequest': 'Invalid request',
    'auth.networkError': 'Network error occurred',
    'auth.genericError': 'An Error Occurred',
    'auth.close': 'Close',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.createAccount': 'Create Account',
    'auth.loginSubtitle': 'Enter your information to log in.',
    'auth.signupSubtitle': 'Fill in the information to register.',
    'auth.loginSuccess': 'Login Successful',
    'auth.loginSuccessMessage':
      'Welcome back! You have been logged in successfully.',
    'auth.welcome': 'Welcome',
    'auth.logoutSuccess': 'Logout Successful',
    'auth.logoutSuccessMessage': 'You have been logged out successfully.',
    'auth.invalidCredentials': 'Your email or password is invalid',
    'auth.registrationSuccess': 'Registration Successful',
    'auth.registrationSuccessMessage':
      'Your account has been created successfully. Welcome!',
    'auth.registrationGenericError':
      'Failed to register account. Please try again later.',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.registerHere': 'Register here',
    'auth.loginHere': 'Login here',
    'auth.or': 'OR',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.creating': 'Creating...',
    'auth.signingIn': 'Signing in...',

    // Common
    'common.ok': 'OK',
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
    'hero.journey':
      "Cody is a journey that connects the world to the cultural essence of Ben Tre through handcrafted coconut candy – the iconic sweet of Vietnam's riverlands. Here, tradition, craftsmanship, and local stories blend into a truly immersive experience.",
    'hero.journeyCta': 'SPEND A DAY WITH US',
    'hero.subtitleCandy': 'Coconut Candy',

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

    // Custom Combo Modal
    'customCombo.errorNameRequired': 'Please enter a name for your combo',
    'customCombo.errorNameMin': 'Name must be at least 3 characters',
    'customCombo.errorNameMax': 'Name must be less than 50 characters',
    'customCombo.errorProductsMin': 'Please add at least 2 products',
    'customCombo.errorProductsMax': 'Maximum 5 products allowed per gift box',
    'customCombo.descriptionIntro': 'Gift Box includes: ',
    'customCombo.descriptionMessagePrefix': ' | Message: ',
    'customCombo.title': 'Create Your Gift Box',
    'customCombo.subtitle': 'Customize a perfect gift for your special someone',
    'customCombo.namePrompt': 'Please start by naming your gift box',
    'customCombo.stepNameTitle': 'Name Your Gift Box',
    'customCombo.namePlaceholder':
      'e.g. Birthday Surprise Box, Anniversary Gift Set...',
    'customCombo.stepProductsTitle': 'Choose Your Products',
    'customCombo.searchPlaceholder': 'Search products to add...',
    'customCombo.categoryLabel': 'Category',
    'customCombo.allCategories': 'All Categories',
    'customCombo.sortLabel': 'Sort By',
    'customCombo.sortName': 'Name',
    'customCombo.sortPriceLow': 'Price: Low to High',
    'customCombo.sortPriceHigh': 'Price: High to Low',
    'customCombo.searchChipPrefix': 'Search',
    'customCombo.buttonAdded': 'Added',
    'customCombo.buttonLimitReached': 'Limit Reached',
    'customCombo.buttonAddToBox': 'Add to Box',
    'customCombo.noProducts': 'No products found. Try a different search term.',
    'customCombo.previewTitle': 'Your Gift Box Preview',
    'customCombo.previewRange': '(2-5 items)',
    'customCombo.emptyTitle': 'Your gift box is empty',
    'customCombo.emptySubtitle': 'Add some products to get started',
    'customCombo.stepMessageTitle': 'Add Gift Message',
    'customCombo.messagePlaceholder': 'Type your message...',
    'customCombo.addTagButton': 'Add',
    'customCombo.totalPrice': 'Total Price',
    'customCombo.addToCart': 'Add Gift Box to Cart ✨',

    // Workshop Section
    'workshop.title': 'YOUR GATEWAY TO BECOMING A\nREFINED CULTURAL INSIDER',
    'workshop.description1':
      "JOIN OUR COCONUT CANDY MAKING WORKSHOP IN BEN TRE — WHERE YOU WILL LEARN TO MAKE VIETNAM'S TRADITIONAL SWEET WITH GUIDANCE FROM LOCAL ARTISANS.",
    'workshop.description2':
      'FROM SELECTING COCONUTS, COOKING, SHAPING, TO PACKAGING, YOU WILL UNDERSTAND THE ENTIRE PROCESS BEHIND THIS TRADITIONAL HANDICRAFT.',
    'workshop.description3':
      'AN INTERESTING, RELAXING EXPERIENCE THAT BRINGS YOU CLOSER TO LOCAL CULTURE — STEP BY STEP IN A SWEET WAY.',
    'workshop.discover': 'DISCOVER',

    // About Section
    'about.title': 'MEET THE MIND BEHIND THE\nPROJECT',
    'about.description':
      'LE BAO LONG, A BEN TRE NATIVE CURRENTLY STUDYING ABROAD, FOUNDED CODY IN 2023 WITH A DEEP LOVE FOR VIETNAMESE CULTURE. WITH SUPPORT FROM HIS MOTHER AND LOCAL ARTISANS, HE BRINGS THE STORY OF TRADITIONAL COCONUT CANDY TO A WIDER AUDIENCE — REIMAGINING HERITAGE THROUGH A MODERN LENS.',
    'about.getToKnow': 'GET TO KNOW',

    // Instagram Section
    'instagram.title': 'FIND US ON\nINSTAGRAM',
    'instagram.subtitle': '& SHARE OUR CODY ADVENTURE',
    'instagram.handle': '@CODY_COCONUT_CANDY',
    'contact.placeholder.name': 'Enter your full name',
    'contact.placeholder.email': 'Enter your email address',
    'contact.placeholder.phone': 'Enter phone number',
    'contact.instagramBanner':
      'FIND US ON INSTAGRAM & SHARE OUR CODY ADVENTURE',

    // Footer
    'footer.description':
      'Sustainable coconut candy brand from Ben Tre - the coconut land. We are committed to bringing high-quality, environmentally friendly products.',
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
    'footer.followDescription':
      'Follow us to update new products and stories about the sustainable journey from Ben Tre.',
    'footer.copyright': '© 2024 CODY - COCONUT CANDY. ALL RIGHTS RESERVED.',

    // Product Card
    'product.addToCart': 'ADD TO CART',

    // Common
    'common.currency': 'VND',
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
  },
  vn: {
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Lỗi',
    'common.close': 'Đóng',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    // Product Detail
    'productDetail.notFound': 'Không tìm thấy sản phẩm',
    'productDetail.backToList': 'Quay lại danh sách sản phẩm',
    'productDetail.breadcrumbHome': 'Trang chủ',
    'productDetail.breadcrumbProducts': 'Sản phẩm',
    'productDetail.ingredients': 'Thành phần',
    'productDetail.weight': 'Trọng lượng',
    'productDetail.addToCart': 'Thêm vào giỏ hàng',
    'productDetail.favorite': 'Yêu thích',
    'productDetail.share': 'Chia sẻ',
    'productDetail.featureFreeShip': 'Miễn phí vận chuyển',
    'productDetail.featureQuality': 'Đảm bảo chất lượng',
    'productDetail.featureNatural': '100% tự nhiên',
    'productDetail.related': 'Sản phẩm liên quan',
    'productDetail.category': 'Danh mục',
    // Badges
    'badges.new': 'Mới',
    'badges.bestSeller': 'Bán chạy',
    'badges.promo': 'Khuyến mãi',
    // Product generic
    'product.viewDetail': 'Xem chi tiết',
    // Product names/descriptions (sample)
    'p.1.name': 'Kẹo Dừa Truyền Thống',
    'p.1.desc':
      'Kẹo dừa nguyên chất theo công thức truyền thống, vị ngọt thanh từ đường mía tự nhiên',
    'p.2.name': 'Combo Kẹo Dừa Mix',
    'p.2.desc':
      'Combo 3 vị: truyền thống, cà phê và sầu riêng. Phù hợp làm quà tặng',
    'p.3.name': 'Hộp Quà Tết CODY',
    'p.3.desc':
      'Hộp quà cao cấp gồm 6 loại kẹo dừa đặc biệt, thiết kế sang trọng',
    'p.4.name': 'Kẹo Dừa Dâu Tây',
    'p.4.desc':
      'Sự kết hợp hoàn hảo giữa vị ngọt của dừa và chua ngọt của dâu tây tự nhiên',
    'p.5.name': 'Kẹo Dừa Cà Phê',
    'p.5.desc':
      'Hương vị đậm đà của cà phê Arabica hòa quyện cùng vị ngọt của dừa',
    'p.6.name': 'Giỏ Quà Bến Tre',
    'p.6.desc':
      'Giỏ quà đặc sản Bến Tre với kẹo dừa và các sản phẩm từ dừa khác',
    // API Product translations
    'p.J3YY-225558.name': 'Bánh dừa nướng Bến Tre',
    'p.J3YY-225558.desc':
      'Bánh dừa nướng đặc sản Bến Tre, làm từ cơm dừa tươi, bột nếp và đường, thơm bùi giòn rụm. Phù hợp để ăn vặt, uống trà hoặc làm quà biếu.',
    'p.58V5-232705.name': 'Bánh dừa nướng Bến Tre 1',
    'p.58V5-232705.desc':
      'Bánh dừa nướng đặc sản Bến Tre, làm từ cơm dừa tươi, bột nếp và đường, thơm bùi giòn rụm. Phù hợp để ăn vặt, uống trà hoặc làm quà biếu.',
    'p.3tOo-102151.name': 'Test tên sản phẩm',
    'p.3tOo-102151.desc': 'Test description sản phẩm',
    // Ingredients samples
    'i.coconutFresh': 'Dừa tươi Bến Tre',
    'i.caneSugar': 'Đường mía tự nhiên',
    'i.seaSalt': 'Muối biển',
    'i.coffeeArabica': 'Cà phê Arabica',
    'i.durian': 'Sầu riêng Đồng Nai',
    'i.premiumSet6': '6 vị kẹo dừa premium',
    'i.luxuryBox': 'Hộp quà sang trọng',
    'i.strawberryDried': 'Dâu tây sấy khô',
    'i.roastedArabica': 'Cà phê Arabica rang mộc',
    'i.codyCandy': 'Kẹo dừa CODY',
    'i.coconutMilk': 'Nước cốt dừa',
    'i.coconutBiscuit': 'Bánh dừa nướng',
    'i.coconutJam': 'Mứt dừa',
    // Products Page
    'products.headerTitle': 'Tất cả sản phẩm',
    'products.headerSubtitle': 'Khám phá bộ sưu tập kẹo dừa thủ công',
    'products.searchPlaceholder': 'Tìm kiếm sản phẩm...',
    'products.category': 'Danh mục',
    'products.allCategories': 'Tất cả danh mục',
    'products.sortCategories': 'Sắp xếp danh mục',
    'products.sort': 'Sắp xếp',
    'products.sortName': 'Tên (A–Z)',
    'products.sortPriceLow': 'Giá: Thấp đến Cao',
    'products.sortPriceHigh': 'Giá: Cao đến Thấp',
    'products.sortUpdated': 'Cập nhật gần đây',
    'products.sortSlug': 'URL Slug (A–Z)',
    'products.activeFilters': 'Bộ lọc đang áp dụng',
    'products.searchLabel': 'Tìm',
    'products.showing': 'Hiển thị {count} sản phẩm',
    'products.inCategory': 'trong danh mục {category}',
    'products.noResultsTitle': 'Không tìm thấy sản phẩm',
    'products.noResultsSubtitle':
      'Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.',
    'products.createCombo': 'Tạo hộp quà',
    // Category names
    'categories.traditional': 'Truyền thống',
    'categories.premium': 'Cao cấp',
    'categories.combo': 'Combo',
    'categories.gift-box': 'Hộp quà',
    'categories.gift-basket': 'Giỏ quà',
    // Brand Story
    'brand.heroTitle': 'Câu chuyện',
    'brand.heroSubtitle': 'Nơi Vị Ngọt Gặp Gỡ Di Sản Việt Nam',
    'brand.originTitle': 'Khởi nguồn từ xứ Dừa',
    'brand.originP1':
      'Bến Tre – mảnh đất được thiên nhiên ưu ái với những hàng dừa xanh mướt, nơi sóng Mekong hòa cùng tiếng lá dừa xào xạc. Đây là nơi CODY ra đời.',
    'brand.originP2':
      'Với tình yêu dành cho quê hương và mong muốn giữ gìn giá trị truyền thống, chúng tôi bắt đầu hành trình tạo ra kẹo dừa vừa thơm ngon vừa thân thiện môi trường.',
    'brand.originP3':
      'Mỗi viên kẹo CODY chứa đựng tâm huyết của người nông dân chăm sóc vườn dừa và sự tận tâm của nghệ nhân nhiều năm kinh nghiệm.',
    'brand.timelineTitle': 'Hành trình phát triển',
    'brand.timelineSubtitle':
      'Từ những bước đi đầu tiên đến hôm nay, chúng tôi kiên định với sứ mệnh chất lượng và bền vững.',
    'brand.milestone1Title': 'Khởi nguồn',
    'brand.milestone1Desc':
      'Ý tưởng hình thành từ tình yêu Bến Tre và mong muốn phát triển bền vững.',
    'brand.milestone2Title': 'Thành lập',
    'brand.milestone2Desc':
      'Chính thức ra mắt với mẻ kẹo dừa đầu tiên quy mô nhỏ.',
    'brand.milestone3Title': 'Mở rộng',
    'brand.milestone3Desc': 'Đa dạng sản phẩm và mở rộng ra toàn quốc.',
    'brand.milestone4Title': 'Tương lai xanh',
    'brand.milestone4Desc': 'Cam kết bền vững và hướng tới vị thế hàng đầu.',
    'brand.valuesTitle': 'Giá trị cốt lõi',
    'brand.valuesSubtitle':
      'Những giá trị định hướng mọi hoạt động và tạo nên khác biệt.',
    'brand.valueSustain': 'Bền vững',
    'brand.valueSustainDesc': 'Cam kết bảo vệ môi trường trong mọi hoạt động.',
    'brand.valueQuality': 'Chất lượng',
    'brand.valueQualityDesc':
      'Đặt chất lượng lên hàng đầu – từ nguyên liệu đến quy trình.',
    'brand.valueCommunity': 'Cộng đồng',
    'brand.valueCommunityDesc': 'Đồng hành cùng nông dân trồng dừa địa phương.',
    'brand.valueTradition': 'Truyền thống',
    'brand.valueTraditionDesc':
      'Gìn giữ và phát huy nghề làm kẹo dừa Việt Nam.',
    'brand.missionTitle': 'Sứ mệnh của chúng tôi',
    'brand.missionText':
      'Chúng tôi mang đến kẹo dừa chất lượng cao, thân thiện môi trường, góp phần bảo tồn nghề truyền thống và phát triển bền vững vì cộng đồng và hành tinh.',
    'brand.ctaExplore': 'Khám phá sản phẩm',
    'brand.ctaContact': 'Liên hệ với chúng tôi',
    // Cart
    'cart.title': 'Giỏ hàng của bạn',
    'cart.itemsCount': 'Có {count} sản phẩm trong giỏ hàng',
    'cart.emptyTitle': 'Giỏ hàng của bạn đang trống',
    'cart.emptySubtitle':
      'Hãy khám phá các sản phẩm kẹo dừa thơm ngon của CODY',
    'cart.continueShopping': 'Tiếp tục mua sắm',
    'cart.price': 'Giá',
    'cart.quantity': 'Số lượng',
    'cart.total': 'Tổng cộng',
    'cart.decreaseQty': 'Giảm số lượng',
    'cart.increaseQty': 'Tăng số lượng',
    'cart.removeItem': 'Xóa sản phẩm khỏi giỏ hàng',
    'cart.clearAll': 'Xóa tất cả sản phẩm',
    'cart.freeShipRemain': 'Còn ',
    'cart.freeShipRemainTail': ' nữa bạn sẽ được MIỄN PHÍ giao hàng! 🛵',
    'cart.freeShipQualified': 'Bạn đã đủ điều kiện MIỄN PHÍ giao hàng! 🎉',
    'cart.addNote': 'Thêm ghi chú',
    'cart.noteLabel': 'Ghi chú đơn hàng',
    'cart.notePlaceholder': 'Nội dung ghi chú (tùy chọn)',
    'cart.noteHelp': 'Ghi chú sẽ được gửi kèm đơn hàng.',
    'cart.taxShipping':
      'Đã bao gồm thuế. Phí vận chuyển sẽ được tính khi thanh toán.',
    'cart.checkout': 'Thanh toán',
    'cart.subtotal': 'Tạm tính',
    'cart.shipping': 'Phí vận chuyển',
    'cart.free': 'Miễn phí',
    'cart.grandTotal': 'Tổng',
    'cart.drawerEmpty': 'Chưa có sản phẩm nào.',
    'cart.proceedCheckout': 'Tiến hành thanh toán',
    // Contact
    'contact.title': 'Liên hệ với CODY',
    'contact.subtitle':
      'Chúng tôi luôn sẵn sàng hỗ trợ bạn về sản phẩm và dịch vụ.',
    'contact.infoTitle': 'Thông tin liên hệ',
    'contact.address': 'Địa chỉ',
    'contact.phone': 'Điện thoại',
    'contact.email': 'Email',
    'contact.hours': 'Giờ làm việc',
    'contact.follow': 'Theo dõi chúng tôi',
    'contact.formTitle': 'Gửi tin nhắn cho chúng tôi',
    'contact.name': 'Họ và tên',
    'contact.phoneOpt': 'Số điện thoại',
    'contact.subject': 'Chủ đề',
    'contact.subjectChoose': 'Chọn chủ đề',
    'contact.subjectProduct': 'Thông tin sản phẩm',
    'contact.subjectOrder': 'Đặt hàng & thanh toán',
    'contact.subjectPartner': 'Hợp tác kinh doanh',
    'contact.subjectFeedback': 'Góp ý & khiếu nại',
    'contact.subjectOther': 'Khác',
    'contact.message': 'Nội dung tin nhắn',
    'contact.messagePlaceholder': 'Nhập nội dung tin nhắn của bạn...',
    'contact.send': 'Gửi tin nhắn',
    'contact.mapTitle': 'Vị trí của chúng tôi',
    // Auth
    'auth.login': 'ĐĂNG NHẬP',
    'auth.loginFailed': 'Đăng nhập thất bại',
    'auth.registrationFailed': 'Đăng ký thất bại',
    'auth.registerFailed': 'Đăng ký thất bại',
    'auth.userNotFound': 'Người dùng không tồn tại',
    'auth.emailExists': 'Email đã tồn tại',
    'auth.passwordTooWeak': 'Mật khẩu quá yếu',
    'auth.invalidRequest': 'Yêu cầu không hợp lệ',
    'auth.networkError': 'Có lỗi xảy ra khi kết nối',
    'auth.genericError': 'Đã có lỗi xảy ra',
    'auth.close': 'Đóng',
    'auth.signIn': 'Đăng nhập',
    'auth.signUp': 'Đăng ký',
    'auth.createAccount': 'Tạo tài khoản',
    'auth.loginSubtitle': 'Điền thông tin để đăng nhập.',
    'auth.signupSubtitle': 'Điền thông tin để đăng ký.',
    'auth.loginSuccess': 'Đăng nhập thành công',
    'auth.loginSuccessMessage':
      'Chào mừng bạn trở lại! Bạn đã đăng nhập thành công.',
    'auth.welcome': 'Chào mừng',
    'auth.logoutSuccess': 'Đăng xuất thành công',
    'auth.logoutSuccessMessage': 'Bạn đã đăng xuất thành công.',
    'auth.invalidCredentials': 'Email hoặc mật khẩu không đúng',
    'auth.registrationSuccess': 'Đăng ký thành công',
    'auth.registrationSuccessMessage':
      'Tài khoản của bạn đã được tạo thành công. Chào mừng bạn!',
    'auth.registrationGenericError':
      'Đăng ký tài khoản thất bại. Vui lòng thử lại sau.',
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.confirmPassword': 'Xác nhận mật khẩu',
    'auth.firstName': 'Tên',
    'auth.lastName': 'Họ',
    'auth.rememberMe': 'Ghi nhớ đăng nhập',
    'auth.forgotPassword': 'Quên mật khẩu?',
    'auth.noAccount': 'Chưa có tài khoản?',
    'auth.haveAccount': 'Đã có tài khoản?',
    'auth.registerHere': 'Đăng ký tại đây',
    'auth.loginHere': 'Đăng nhập',
    'auth.or': 'HOẶC',
    'auth.continueWithGoogle': 'Tiếp tục với Google',
    'auth.creating': 'Đang tạo...',
    'auth.signingIn': 'Đang đăng nhập...',

    // Common
    'common.ok': 'OK',

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
    'hero.journey':
      'Cody là một hành trình kết nối thế giới với tinh hoa văn hoá Bến Tre thông qua kẹo dừa thủ công – món ngọt biểu tượng của miền sông nước Việt Nam. Ở đây, truyền thống, tay nghề và câu chuyện địa phương hòa quyện tạo nên một trải nghiệm chân thật.',
    'hero.journeyCta': 'DÀNH MỘT NGÀY VỚI CHÚNG TÔI',
    'hero.subtitleCandy': 'Kẹo Dừa',

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

    // Custom Combo Modal
    'customCombo.errorNameRequired': 'Vui lòng đặt tên cho hộp quà của bạn',
    'customCombo.errorNameMin': 'Tên phải có ít nhất 3 ký tự',
    'customCombo.errorNameMax': 'Tên phải dưới 50 ký tự',
    'customCombo.errorProductsMin': 'Vui lòng chọn ít nhất 2 sản phẩm',
    'customCombo.errorProductsMax': 'Mỗi hộp quà tối đa 5 sản phẩm',
    'customCombo.descriptionIntro': 'Hộp quà gồm: ',
    'customCombo.descriptionMessagePrefix': ' | Lời nhắn: ',
    'customCombo.title': 'Tạo hộp quà của bạn',
    'customCombo.subtitle': 'Tùy chỉnh món quà hoàn hảo cho người đặc biệt',
    'customCombo.namePrompt': 'Hãy bắt đầu bằng việc đặt tên cho hộp quà',
    'customCombo.stepNameTitle': 'Đặt tên cho hộp quà',
    'customCombo.namePlaceholder': 'Ví dụ: Hộp quà sinh nhật, Set kỷ niệm...',
    'customCombo.stepProductsTitle': 'Chọn sản phẩm',
    'customCombo.searchPlaceholder': 'Tìm sản phẩm để thêm...',
    'customCombo.categoryLabel': 'Danh mục',
    'customCombo.allCategories': 'Tất cả danh mục',
    'customCombo.sortLabel': 'Sắp xếp',
    'customCombo.sortName': 'Tên',
    'customCombo.sortPriceLow': 'Giá: Thấp đến Cao',
    'customCombo.sortPriceHigh': 'Giá: Cao đến Thấp',
    'customCombo.searchChipPrefix': 'Tìm kiếm',
    'customCombo.buttonAdded': 'Đã thêm',
    'customCombo.buttonLimitReached': 'Đã đạt giới hạn',
    'customCombo.buttonAddToBox': 'Thêm vào hộp quà',
    'customCombo.noProducts': 'Không tìm thấy sản phẩm. Hãy thử từ khóa khác.',
    'customCombo.previewTitle': 'Xem trước hộp quà của bạn',
    'customCombo.previewRange': '(2-5 sản phẩm)',
    'customCombo.emptyTitle': 'Hộp quà của bạn đang trống',
    'customCombo.emptySubtitle': 'Hãy thêm sản phẩm để bắt đầu',
    'customCombo.stepMessageTitle': 'Thêm lời nhắn',
    'customCombo.messagePlaceholder': 'Nhập lời nhắn...',
    'customCombo.addTagButton': 'Thêm',
    'customCombo.totalPrice': 'Tổng giá',
    'customCombo.addToCart': 'Thêm hộp quà vào giỏ ✨',

    // Workshop Section
    'workshop.title': 'CÁNH CỬA ĐỂ TRỞ THÀNH\nNGƯỜI AM HIỂU VĂN HÓA',
    'workshop.description1':
      'THAM GIA WORKSHOP LÀM KẸO DỪA THỰC HÀNH TẠI BẾN TRE —\nNƠI BẠN SẼ HỌC CÁCH LÀM MÓN NGỌT TRUYỀN THỐNG CỦA VIỆT NAM\nVỚI SỰ HƯỚNG DẪN TỪ CÁC NGHỆ NHÂN ĐỊA PHƯƠNG.',
    'workshop.description2':
      'TỪ VIỆC CHỌN DỪA, NẤU, TẠO HÌNH, ĐẾN GÓI GHÉ,\nBẠN SẼ HIỂU RÕ TOÀN BỘ QUY TRÌNH ĐẰNG SAU\nNGHỀ THỦ CÔNG TRUYỀN THỐNG NÀY.',
    'workshop.description3':
      'MỘT TRẢI NGHIỆM THÚ VỊ, THƯ GIÃN GIÚP BẠN GẦN GŨI HỚN\nVỚI VĂN HÓA ĐỊA PHƯƠNG — TỪNG BƯỚC MỘT CÁCH NGỌT NGÀO.',
    'workshop.discover': 'KHÁM PHÁ',

    // About Section
    'about.title': 'GẶP GỠ TÂM HỒN\nCỦA DỰ ÁN',
    'about.description':
      'LÊ BẢO LONG, NGƯỜI BẾN TRE HIỆN ĐANG HỌC TẬP Ở NƯỚC NGOÀI,\nTHÀNH LẬP CODY NĂM 2023 VỚI TÌNH YÊU SÂU SẮC DÀNH CHO VĂN HÓA VIỆT NAM.\nVỚI SỰ HỖ TRỢ TỪ MẸ VÀ CÁC NGHỆ NHÂN ĐỊA PHƯƠNG,\nANH MANG CÂU CHUYỆN VỀ KẸO DỪA TRUYỀN THỐNG\nĐẾN VỚI KHÁN GIẢ RỘNG LỚN — TÁI HIỆN DI SẢN\nQUA GÓCS NHÌN HIỆN ĐẠI.',
    'about.getToKnow': 'TÌM HIỂU THÊM',

    // Instagram Section
    'instagram.title': 'TÌM CHÚNG TÔI TRÊN\nINSTAGRAM',
    'instagram.subtitle': '& CHIA SẺ HÀNH TRÌNH CODY',
    'instagram.handle': '@CODY_COCONUT_CANDY',
    'contact.placeholder.name': 'Nhập họ và tên của bạn',
    'contact.placeholder.email': 'Nhập địa chỉ email',
    'contact.placeholder.phone': 'Nhập số điện thoại',
    'contact.instagramBanner':
      'TÌM CHÚNG TÔI TRÊN INSTAGRAM & CHIA SẺ HÀNH TRÌNH CODY',

    // Footer
    'footer.description':
      'Thương hiệu kẹo dừa bền vững từ Bến Tre - xứ dừa. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, thân thiện với môi trường.',
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
    'footer.followDescription':
      'Theo dõi chúng tôi để cập nhật những sản phẩm mới và câu chuyện về hành trình bền vững từ Bến Tre.',
    'footer.copyright': '© 2024 CODY - KẸO DỪA. BẢN QUYỀN THUỘC VỀ CHÚNG TÔI.',

    // Product Card
    'product.addToCart': 'THÊM VÀO GIỎ',

    // Common
    'common.currency': 'VND',
    'common.readMore': 'Đọc tiếp',
    'common.learnMore': 'Tìm hiểu thêm',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
