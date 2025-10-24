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
    //Contact:
    'contact.address.company':
      '123 Dua Street, An Hoa Ward, \n Ben Tre City, Ben Tre Province',
    'contact.working.1': 'Monday - Friday: 8:00 AM - 5:00 PM',
    'contact.working.2': 'Saturday: 8:00 AM - 12:00 PM',
    'contact.working.3': 'Sunday: Closed',
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    cart: 'Shopping cart',
    noItem: 'There are no products.',
    specialNotes: 'Special notes',
    'placeholder.note': 'Enter your special request...',
    'custom.name.gift': 'Name gift',
    'custom.placeholder.gift': 'Enter your gift name...',
    'custom.name.sticker': 'Name sticker',
    'custom.selected.gift': 'Select Products',
    'custom.selected.sticker': 'Select sticker',
    'custom.placeholder.sticker': 'Enter your sticker name...',
    'custom.selected': 'selected',
    'custom.button.order': 'Order now',
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

    'cultural.title': 'The Cultural Story of Ben Tre & Coconut Candy',
    'cultural.p1':
      'Known as the Land of Coconuts, Ben Tre is where generations have turned simple ingredients into timeless flavors. Coconut candy represents more than sweetness — it embodies the craftsmanship, warmth, and resilience of the people who make it.',
    'cultural.p2':
      'At CODY, we preserve that legacy while giving it a modern identity. Our candies celebrate the harmony between tradition and innovation, offering a taste that feels both nostalgic and refreshingly new.',
    'cultural.p3':
      'Through each piece of candy, we tell the story of creativity, culture, and connection — from Vietnam to the world.',

    // The Mind Behind The CODY section
    'mind.title': 'The Mind Behind The CODY',
    'mind.subtitle': 'The story, values, and purpose behind our journey.',
    'mind.name': 'Le Bao Long',
    'mind.role': 'Founder & CEO of CODY',
    'mind.story':
      'Le Bao Long is a Vietnamese student who founded CODY with a mission to modernize the traditional Ben Tre coconut candy. What started as a high school idea has grown into a movement celebrating sustainability, culture, and compassion.',
    'mind.quote':
      '“We want people to taste more than candy — we want them to taste the story of Vietnam, humble yet full of hope.”',
    'mind.mission':
      'Through every candy, CODY connects people worldwide with the craftsmanship and warmth of Vietnamese tradition.',

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
    'brand.heroHighlight': 'BEN TRE & COCONUT CANDY',
    'brand.heroSubtitle':
      'Known as the Land of Coconuts, Ben Tre is where generations have turned simple ingredients into timeless flavors. Coconut candy represents more than sweetness — it embodies the craftsmanship, warmth, and resilience of the people who make it. At CODY, we preserve that legacy while giving it a modern identity. Our candies celebrate the harmony between tradition and innovation, offering a taste that feels both nostalgic and refreshingly new.',
    'brand.originTitle': 'About CODY',
    'brand.originP1':
      'At CODY, we bring a modern twist to one of Vietnam’s most beloved traditions — the Ben Tre coconut candy.',
    'brand.originP2':
      'Founded by high school student Le Bao Long, CODY started as a small idea to give new life to a familiar treat — creating a product that’s not only delicious but also meaningful.',
    'brand.originP3':
      'We believe in sustainability, cultural pride, and community impact. Every piece of candy reflects our commitment to responsible production, from using recycled coconut by-products for packaging to promoting eco-conscious gifting.',
    'brand.originP4':
      'CODY isn’t just candy — it’s a story of creativity, culture, and compassion, handcrafted in Vietnam and shared with the world.',
    'brand.timelineTitle': 'Experience Ben Tre',
    'brand.timelineSubtitle':
      'We invite travelers and culture lovers to explore Ben Tre through the CODY Experience — a hands-on journey into the art of coconut.',
    'brand.milestone1Title': 'Make your own coconut candy',
    'brand.milestone1Desc':
      'with local artisans and witness every stage — from melting sugar and stirring the mixture to cutting and wrapping by hand. Let the sweet aroma of coconut, joyful laughter, and warm local stories bring you back to childhood memories, where human connection and the taste of home melt together in every bite.',
    'brand.milestone2Title': 'Craft with coconut leaves',
    'brand.milestone2Desc':
      'with local villagers as they guide you step by step to craft baskets, hats, or beautiful ornaments. Each creation is more than a souvenir — it is a symbol of creativity, skill, and the hardworking spirit of the people of the coconut land, reflecting their deep bond with nature and traditional culture.',
    'brand.milestone3Title': 'Row through coconut groves',
    'brand.milestone3Desc':
      'to fully embrace the tranquility of the waterways. With each gentle stroke, glide beneath lush green palms, listen to the birds singing, and breathe in the salty breeze. It’s more than a ride — it’s a journey of inner peace, harmony, and the simple joy of slowing down in the heart of life.',
    'brand.milestone4Title': 'Join art workshops',
    'brand.milestone4Desc':
      'using coconut wood and natural materials to awaken your inner creativity. From selecting the materials and shaping them to perfecting your design, each step is a meaningful journey of connection with art and nature. Bring home a one-of-a-kind creation that reflects your personality and supports a sustainable, eco-friendly lifestyle.',
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
    'purpose.title': 'Our Purpose',
    'purpose.des':
      'Our mission goes beyond business — it’s about sharing sweetness and spreading hope.',
    'purpose.label1': 'For the planet',
    'purpose.labelDes1':
      'We design packaging from recycled coconut fibers and natural materials like water hyacinth and palm leaves.',
    'purpose.label2': 'For the community',
    'purpose.labelDes2':
      'Through our CODY Scholarship Box campaign, we’ve raised over 70,000,000 VND to support education for 100+ underprivileged students across Vietnam.',
    'purpose.label3': 'For the culture',
    'purpose.labelDes3':
      'We aim to showcase Vietnam’s craftsmanship on the global stage, where each candy tells a story of kindness, creativity, and care.',
    'purpose.tagLine':
      '“Each experience connects you to the soul of Vietnam — a place where nature, craft, and community come together in harmony.”',
    'meet.title': 'Meet the Founder',
    'meet.subtitle':
      'Câu chuyện đằng sau tầm nhìn của CODY và trái tim đã thúc đẩy nó tiến về phía trước.',
    'meet.name': 'Le Bao Long',
    'meet.role': 'Founder & CEO of CODY',
    'meet.des':
      'Le Bao Long, a Vietnamese student studying in California, is driven by a mission to bridge cultures through entrepreneurship. From selling 1,200+ handmade products in Phase I to building scholarship programs for students in need, Long’s vision is to redefine what a “sweet” brand can mean — a symbol of culture, sustainability, and compassion.',
    'meet.quote':
      '“We want people to taste more than candy. We want them to taste the story of Vietnam — one that’s humble, hopeful, and beautifully human.”',

    'experience.title': 'Experience Ben Tre',
    'experience.subtitle':
      'We invite travelers and culture lovers to explore Ben Tre through the CODY Experience – a hands-on journey into the art of coconut.',
    'experience.p1':
      'Make your own coconut candy with local artisans and witness every stage – from melting sugar and stirring the mixture to cutting and wrapping by hand.',
    'experience.p2':
      'Let the sweet aroma of coconut, joyful laughter, and warm local stories bring you back to childhood memories.',
    'experience.p3':
      'Where human connection and the taste of home melt together in every bite.',
    'auth.logout': 'LOGOUT',

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
      'Your account has been created successfully.',
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
    'nav.blog': 'BLOG',
    'nav.culture': 'EXPLORE CULTURE',
    'nav.home': 'HOME',
    'nav.special': 'SPECIAL EDITION',
    'nav.orderHistory': 'Order History',
    'nav.wishlist': 'Wishlist',

    // Wishlist
    'wishlist.title': 'My Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Start adding your favorite products!',
    'wishlist.browseProd': 'Browse Products',
    'wishlist.items': 'items',
    'wishlist.inStock': 'In Stock',
    'wishlist.outStock': 'Out of Stock',
    'wishlist.addCart': 'Add to Cart',
    'wishlist.remove': 'Remove from wishlist',
    'wishlist.added': 'Added to wishlist',
    'wishlist.removed': 'Removed from wishlist',

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
    // Personalize page additions
    'custom.personalizedSubtitle':
      'Create a meaningful gift by selecting items, adding a message, and choosing packaging.',
    'custom.buildCombo': 'Build your combo',
    'customWhy.title': 'Why choose Personalized Gift',
    'customWhy.description':
      'Design a beautiful and meaningful gift — pick flavors, compose the set, and add a personal note.',
    // Detailed personalize page content (EN)
    'personalize.heroTitle': 'PERSONALIZED GIFT – CREATE A GIFT YOUR WAY',
    'personalize.heroSubtitle': 'Discover meaning and creativity in every gift',
    'personalize.intro':
      "We understand a gift is more than an item — it is the message and feeling you want to send. With Personalized Gift service, you can handcraft unique presents that carry your personal touch. Whether it's a birthday, holiday, or any special occasion, we are here to help you express care and thoughtfulness through every detail.",
    'personalize.whyTitle': 'Why Choose Personalized Gift?',
    'personalize.why.p1.title': 'Freedom to Create a Gift of Your Choice',
    'personalize.why.p1.desc':
      "You can fully customize your gift set, from selecting the products in the set to choosing the packaging and gift basket style that best suits the recipient's preferences.",
    'personalize.why.p2.title': 'Create a Personal Touch',
    'personalize.why.p2.desc':
      ' Every product in the gift basket can be personalized, from selecting your favorite candy flavor to choosing accessories like coconut husk cups, coconut wood spoons and forks. Every detail shows the care and attention you put into choosing the perfect gift for the recipient.',
    'personalize.why.p3.title': 'Special meaning',
    'personalize.why.p3.desc':
      'Gifts that are designed and selected just for you bring a sense of closeness, warmth, and uniqueness, making the recipient feel truly special.',
    'personalize.customTitle': 'Customize Your Gift to Your Liking',
    'personalize.customIntro':
      'With the Personalized Gift service, you can select your favorite products to create a unique and meaningful gift set. You can also request adjustments to factors such as:',
    'personalize.custom.p1.title': 'Selecting Products in a Gift Set',
    'personalize.custom.p1.desc':
      'You can change the candy flavors or add/remove accessories in the gift basket to better match the recipient’s preferences.',
    'personalize.custom.p2.title': 'Customize Packaging and Gift Baskets',
    'personalize.custom.p2.desc':
      'We offer a variety of gift baskets and boxes, allowing you to request a gift basket tailored to your personal style, from the shape and material to the color.',
    'personalize.custom.p3.title': 'Add a Personal Message',
    'personalize.custom.p3.desc':
      'You can include a loving message or a special note to make the gift even more meaningful. We will help you convey this message in a delicate and beautiful wa.',
    'personalize.reasonsTitle': 'Why Choose Personalized Gift from Us?',
    'personalize.reasons.p1.title': 'Guaranteed Quality',
    'personalize.reasons.p1.desc':
      'All of our gift products are made from natural ingredients, ensuring quality and safety for health.',
    'personalize.reasons.p2.title': 'Professional Service',
    'personalize.reasons.p2.desc':
      'Our team is always ready to support you in creating the gift of your dreams, ensuring total satisfaction for our customers.',
    'personalize.reasons.p3.title': 'Unique gifts',
    'personalize.reasons.p3.desc':
      'With each personalized gift, you will create a product that bears a strong personal mark, leaving a lasting impression on the recipient.',

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
    'instagram.title': 'FIND US ON\nFACEBOOK',
    'instagram.subtitle': '& SHARE OUR CODY ADVENTURE',
    'instagram.handle': 'CODY - Coconut Candy ',
    'contact.placeholder.name': 'Enter your full name',
    'contact.placeholder.email': 'Enter your email address',
    'contact.placeholder.phone': 'Enter phone number',
    'contact.instagramBanner': 'FIND US ON FACEBOOK & SHARE OUR CODY ADVENTURE',
    'contact.reachOut': 'Reach out to us',

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
    'footer.copyright': '© 2025 CODY - COCONUT CANDY. ALL RIGHTS RESERVED.',

    // Product Card
    'product.addToCart': 'ADD TO CART',

    // Common
    'common.currency': 'VND',
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',

    'sticker.title':
      'CUSTOMIZE STICKERS – PERSONALIZE YOUR STICKERS WITH YOUR STYLE',
    'sticker.intro': 'Add a Special Message Through Customized Stickers',
    'sticker.introDes':
      'We understand that every gift carries its own unique message, and sometimes, that message is best conveyed not just through words, but also through images. With our Customize Stickers service, you can create personalized stickers to accompany your gifts, delivering a special message of love, gratitude, or any personal note you wish to share with the recipient.',

    'sticker.reasonTitle': 'Why Choose Customize Stickers?',
    'sticker.reasonCustomize': 'Fully Customizable Stickers',
    'sticker.reasonCustomizeDes':
      'Choose from a range of available sticker designs or create your own with personalized images, colors, and messages. Each sticker can carry a meaningful and creative message that reflects your style and thoughtfulness.',
    'sticker.reasonMessage': 'Unique Personal Messages',
    'sticker.reasonMessageDes':
      'In addition to the available sticker designs, you can add your own favorite quotes, congratulations, or any other personal message you want to send to the recipient. This is a wonderful way to make your gift truly unique and thoughtful.',
    'sticker.reasonQuality': 'Premium Quality Stickers',
    'sticker.reasonQualityDes':
      'Our stickers are printed on high-quality material, ensuring vibrant colors that won’t fade over time, making your gift stand out and remain impressive.',

    'sticker.customizationTitle': 'Easily Customize and Add to Your Gift',
    'sticker.chooseDesign': 'Choose a Sticker Design',
    'sticker.chooseDesignDes':
      'You can pick from a wide variety of cute, lively, and diverse stickers we offer. Alternatively, if you have a specific design in mind, feel free to upload your own, and we will print it for you.',
    'sticker.addToGift': 'Add Stickers to Your Gift',
    'sticker.addToGiftDes':
      'Once you’ve selected your stickers, you can easily add them to your gift basket or set. The stickers will be carefully packed and sent along with your gift to surprise and delight the recipient.',
    'sticker.addPersonalMessage': 'Personalized Messages',
    'sticker.addPersonalMessageDes':
      'You can request us to print a personal message along with your stickers to make the gift even more meaningful. Whether it’s a congratulatory message, a thank-you note, or any special message, we will help convey it in an elegant and beautiful way.',

    'sticker.finalTitle': 'Create a Unique Gift with Customized Stickers',
    'sticker.finalDes':
      'We believe that every gift is not just an item to be given but a way for you to express your feelings and care. Let Customize Stickers help you convey your message of love and create a truly meaningful gift.',
    'sticker.cta':
      'Start customizing your stickers today to add a special touch to your gifts, filled with love and creativity!',

    'error.nameCombo': 'Please enter the combo name.',
    'error.noteCombo': 'Please enter a note.',
    'error.buyerName': "Please enter the buyer's name.",
    'error.buyerPhone': 'Please enter the phone number.',
    'error.addressUrl': 'Please enter the address.',
  },
  vn: {
    //Contact:
    'contact.address.company':
      '123 Đường Dừa, Phường An Hòa \n TP. Bến Tre, Tỉnh Bến Tre',
    'contact.working.1': 'Thứ 2 - Thứ 6: 8:00 - 17:00',
    'contact.working.2': 'Thứ 7: 8:00 - 12:00',
    'contact.working.3': 'Chủ nhật: Nghỉ',
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Lỗi',
    'common.close': 'Đóng',
    'common.cancel': 'Hủy',
    'common.save': 'Lưu',
    cart: 'Giỏ hàng',
    noItem: 'Không có sản phẩm nào.',
    specialNotes: 'Ghi chú đặc biệt',
    'placeholder.note': 'Nhập yêu cầu đặc biệt của bạn...',
    'custom.name.gift': 'Tên quà tặng',
    'custom.placeholder.gift': 'Nhập tên quà tặng của bạn...',
    'custom.name.sticker': 'Tên sticker',
    'custom.selected.gift': 'Chọn Sản phẩm',
    'custom.selected.sticker': 'Chọn sticker',
    'custom.placeholder.sticker': 'Nhập tên sticker của bạn...',
    'custom.selected': 'đã chọn',
    'custom.button.order': 'Đặt hàng ngay',
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

    'cultural.title': 'Câu Chuyện Văn Hóa Về Bến Tre & Kẹo Dừa',
    'cultural.p1':
      'Bến Tre – “xứ dừa” của Việt Nam – là nơi bao thế hệ đã biến những nguyên liệu giản dị thành hương vị vượt thời gian. Kẹo dừa không chỉ là vị ngọt mà còn là sự khéo léo, ấm áp và bền bỉ của những con người làm nên nó.',
    'cultural.p2':
      'Tại CODY, chúng tôi gìn giữ di sản ấy, đồng thời thổi vào đó hơi thở hiện đại. Mỗi viên kẹo là sự hòa quyện giữa truyền thống và sáng tạo, mang đến cảm giác vừa thân thuộc vừa mới mẻ.',
    'cultural.p3':
      'Qua từng viên kẹo, CODY kể câu chuyện về sáng tạo, văn hóa và sự gắn kết – từ Việt Nam vươn ra thế giới.',

    'experience.title': 'Trải Nghiệm Bến Tre',
    'experience.subtitle':
      'Chúng tôi mời bạn đến khám phá Bến Tre thông qua hành trình “CODY Experience” – một chuyến đi thực hành đầy cảm hứng về nghệ thuật kẹo dừa.',
    'experience.p1':
      'Tự tay làm kẹo dừa cùng nghệ nhân địa phương, tận mắt chứng kiến từng công đoạn – từ nấu đường, khuấy kẹo, đến cắt và gói bằng tay.',
    'experience.p2':
      'Hãy để hương dừa ngọt ngào, tiếng cười vui và những câu chuyện ấm áp đưa bạn trở lại ký ức tuổi thơ.',
    'experience.p3':
      'Nơi con người và hương vị quê hương hòa quyện trong từng viên kẹo.',

    'auth.logout': 'ĐĂNG XUẤT',

    // Category names
    'categories.traditional': 'Truyền thống',
    'categories.premium': 'Cao cấp',
    'categories.combo': 'Combo',
    'categories.gift-box': 'Hộp quà',
    'categories.gift-basket': 'Giỏ quà',
    // Brand Story
    'brand.heroTitle': 'Câu chuyện',
    'brand.heroHighlight': 'BẾN TRE & KẸO DỪA',
    'brand.heroSubtitle':
      'Được mệnh danh là “Xứ dừa”, Bến Tre là nơi qua bao thế hệ, con người đã biến những nguyên liệu giản dị thành hương vị trường tồn. Kẹo dừa không chỉ mang vị ngọt — mà còn là sự khéo léo, ấm áp và bền bỉ của những người tạo nên nó. Tại CODY, chúng tôi giữ gìn tinh hoa ấy và khoác lên nó một diện mạo hiện đại. Mỗi viên kẹo là sự hòa quyện giữa truyền thống và sáng tạo, mang đến hương vị vừa quen thuộc, vừa mới mẻ.',
    'brand.originTitle': 'Về CODY',
    'brand.originP1':
      'Tại CODY, chúng tôi mang đến một phiên bản hiện đại của món kẹo dừa Bến Tre — biểu tượng ngọt ngào của văn hóa Việt Nam.',
    'brand.originP2':
      'Dự án được sáng lập bởi Lê Bảo Long, một học sinh trung học với mong muốn thổi làn gió mới vào món quà truyền thống, tạo nên sản phẩm vừa ngon miệng vừa mang giá trị sâu sắc.',
    'brand.originP3':
      'Chúng tôi tin vào sự bền vững, niềm tự hào văn hóa và tác động cộng đồng. Mỗi viên kẹo là cam kết cho trách nhiệm với môi trường — từ bao bì làm từ phế phẩm dừa tái chế đến ý tưởng quà tặng thân thiện.',
    'brand.originP4':
      'CODY không chỉ là kẹo — đó là câu chuyện của sáng tạo, văn hóa và lòng nhân ái, được làm thủ công tại Việt Nam và gửi ra thế giới.',
    'brand.timelineTitle': 'Hành trình trải nghiệm Bến Tre',
    'brand.timelineSubtitle':
      'Hãy khám phá Bến Tre qua hành trình trải nghiệm CODY — nơi bạn được trực tiếp hòa mình vào nghệ thuật từ dừa.',
    'brand.milestone1Title': 'Tự tay làm kẹo dừa',
    'brand.milestone1Desc':
      'cùng những nghệ nhân địa phương, bạn sẽ được tận mắt chứng kiến từng công đoạn từ nấu đường, đảo kẹo đến cắt và gói bằng tay. Hãy để hương thơm ngọt ngào của dừa, tiếng cười rộn ràng và câu chuyện làng nghề đưa bạn về miền ký ức tuổi thơ, nơi tình người và hương vị quê hương hoà quyện.',
    'brand.milestone2Title': 'Đan sản phẩm từ lá dừa',
    'brand.milestone2Desc':
      'cùng người dân bản địa, bạn sẽ được hướng dẫn tỉ mỉ từng thao tác để tạo ra giỏ, mũ hay vật trang trí độc đáo. Mỗi sản phẩm không chỉ là món quà lưu niệm mang đậm dấu ấn miền Tây, mà còn là biểu tượng của sự sáng tạo, khéo léo và tình yêu lao động của con người xứ dừa.',
    'brand.milestone3Title': 'Chèo thuyền giữa rặng dừa',
    'brand.milestone3Desc':
      'để cảm nhận trọn vẹn nét yên bình của miền sông nước. Mỗi nhịp chèo nhẹ đưa bạn đi qua những tán dừa xanh mát, nghe tiếng chim gọi bạn tình, và hít hà hương gió mặn mà. Đây không chỉ là chuyến đi, mà còn là hành trình tìm lại sự cân bằng, thư thái và niềm vui giản dị trong cuộc sống.',
    'brand.milestone4Title': 'Tham gia workshop nghệ thuật',
    'brand.milestone4Desc':
      'từ gỗ dừa và vật liệu tự nhiên để khám phá khả năng sáng tạo bên trong bạn. Từ khâu chọn nguyên liệu, tạo hình, đến hoàn thiện sản phẩm, mỗi bước đều là cơ hội để bạn kết nối với nghệ thuật và thiên nhiên. Hãy mang về một tác phẩm độc đáo, chứa đựng dấu ấn cá nhân và tinh thần bền vững.',
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
    'purpose.title': 'Sứ mệnh của chúng tôi',
    'purpose.des':
      'Sứ mệnh của chúng tôi vượt xa kinh doanh — đó là lan tỏa vị ngọt và gieo mầm hy vọng.',
    'purpose.label1': 'Vì hành tinh',
    'purpose.labelDes1':
      'Bao bì được làm từ sợi dừa tái chế và vật liệu tự nhiên như lá dừa, cây lục bình.',
    'purpose.label2': 'Vì cộng đồng',
    'purpose.labelDes2':
      'Chiến dịch CODY Scholarship Box đã gây quỹ hơn 70.000.000 đồng, trao học bổng cho hơn 100 học sinh khó khăn trên khắp Việt Nam.',
    'purpose.label3': 'Vì tương lai',
    'purpose.labelDes3':
      'Chúng tôi mong muốn đưa tay nghề Việt Nam ra thế giới, để mỗi viên kẹo trở thành câu chuyện về lòng nhân ái, sự sáng tạo và tinh thần Việt.',
    'purpose.tagLine':
      '“Mỗi trải nghiệm là một nhịp cầu nối bạn đến linh hồn của Việt Nam — nơi thiên nhiên, con người và văn hóa giao hòa.”',
    'meet.title': 'Meet the Founder',
    'meet.subtitle':
      'The story behind CODY’s vision and the heart that drives it forward.',
    'meet.name': 'Lê Bảo Long',
    'meet.role': 'Người sáng lập và Chủ tịch của CODY',
    'meet.des':
      'Lê Bảo Long, nhà sáng lập và Chủ tịch dự án CODY, là một học sinh Việt Nam đang học tập tại California, với mong muốn kết nối văn hóa qua con đường khởi nghiệp. Từ việc bán hơn 1.200 sản phẩm thủ công trong giai đoạn đầu, đến xây dựng chương trình học bổng giúp đỡ học sinh khó khăn, Long mong muốn định nghĩa lại ý nghĩa của “một thương hiệu ngọt ngào” — đó là biểu tượng của văn hóa, bền vững và lòng nhân ái.',
    'meet.quote':
      '“Chúng tôi không chỉ muốn mọi người nếm vị kẹo, mà còn muốn họ cảm nhận được câu chuyện Việt Nam — mộc mạc, đầy hy vọng và đậm tính con người.”',
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
      'Tài khoản của bạn đã được tạo thành công.',
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
    'nav.blog': 'BÀI VIẾT',
    'nav.culture': 'KHÁM PHÁ VĂN HÓA',
    'nav.home': 'TRANG CHỦ',
    'nav.special': 'PHIÊN BẢN ĐẶC BIỆT',
    'nav.wishlist': 'Yêu Thích',

    // Wishlist
    'wishlist.title': 'Danh Sách Yêu Thích',
    'wishlist.empty': 'Danh sách yêu thích trống',
    'wishlist.emptyDesc': 'Hãy bắt đầu thêm sản phẩm yêu thích của bạn!',
    'wishlist.browseProd': 'Xem Sản Phẩm',
    'wishlist.items': 'sản phẩm',
    'wishlist.inStock': 'Còn Hàng',
    'wishlist.outStock': 'Hết Hàng',
    'wishlist.addCart': 'Thêm Vào Giỏ',
    'wishlist.remove': 'Xóa khỏi danh sách',
    'wishlist.added': 'Đã thêm vào yêu thích',
    'wishlist.removed': 'Đã xóa khỏi yêu thích',
    'nav.orderHistory': 'Lịch Sử Đơn Hàng',

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
    // Detailed personalize page content (VN)
    'personalize.heroTitle':
      'PERSONALIZED GIFT – TẠO DỰNG MÓN QUÀ THEO PHONG CÁCH CỦA BẠN',
    'personalize.heroSubtitle':
      'Khám Phá Ý Nghĩa Và Sự Sáng Tạo Trong Mỗi Món Quà',
    'personalize.intro':
      'Chúng tôi hiểu rằng món quà không chỉ là vật phẩm trao tặng, mà còn là thông điệp và tình cảm mà bạn muốn gửi gắm. Với dịch vụ Personalized Gift, bạn hoàn toàn có thể tự tay tạo ra những món quà độc đáo, mang đậm dấu ấn cá nhân cho người thân yêu. Dù là dịp sinh nhật, lễ tết, hay bất kỳ sự kiện đặc biệt nào, chúng tôi luôn sẵn sàng giúp bạn thể hiện sự tinh tế và chân thành qua từng món quà.',
    'personalize.whyTitle': 'Tại Sao Chọn Personalized Gift?',
    'personalize.why.p1.title': 'Tự Do Tạo Ra Món Quà Theo Ý Thích',
    'personalize.why.p1.desc':
      'Bạn có thể tùy chỉnh bộ quà của mình, từ chọn lựa các sản phẩm trong set quà cho đến việc lựa chọn cách đóng gói và giỏ quà sao cho phù hợp với sở thích của người nhận.',
    'personalize.why.p2.title': 'Tạo Dấu Ấn Cá Nhân',
    'personalize.why.p2.desc':
      'Mỗi sản phẩm trong giỏ quà đều có thể được cá nhân hóa, từ việc chọn hương vị kẹo yêu thích đến việc chọn các món quà phụ kiện như ly xơ dừa, muỗng nĩa gỗ dừa, tất cả đều thể hiện sự tỉ mỉ và chăm chút trong việc lựa chọn món quà cho người nhận.',
    'personalize.why.p3.title': 'Ý Nghĩa Đặc Biệt',
    'personalize.why.p3.desc':
      'Những món quà được thiết kế và lựa chọn riêng sẽ mang lại cảm giác gần gũi, ấm áp và độc đáo, khiến người nhận cảm thấy thực sự đặc biệt.',
    'personalize.customTitle': 'Tùy Chỉnh Món Quà Theo Ý Muốn',
    'personalize.customIntro':
      'Với dịch vụ Personalized Gift, bạn có thể tự chọn những sản phẩm yêu thích để tạo nên bộ quà độc đáo và đầy ý nghĩa. Bạn cũng có thể yêu cầu điều chỉnh thêm các yếu tố như:',
    'personalize.custom.p1.title': 'Chọn lựa sản phẩm trong combo quà',
    'personalize.custom.p1.desc':
      'Bạn có thể thay đổi các hương vị kẹo hoặc thêm bớt các món phụ kiện trong giỏ quà để phù hợp với sở thích của người nhận.',
    'personalize.custom.p2.title': 'Tùy chỉnh cách đóng gói và giỏ quà',
    'personalize.custom.p2.desc':
      'Chúng tôi cung cấp các loại giỏ quà và hộp quà đa dạng, bạn có thể yêu cầu giỏ quà theo sở thích cá nhân của mình, từ kiểu dáng, chất liệu đến màu sắc.',
    'personalize.custom.p3.title': 'Gửi thông điệp cá nhân',
    'personalize.custom.p3.desc':
      'Bạn có thể kèm theo lời nhắn yêu thương hoặc thông điệp đặc biệt để tạo nên một món quà ý nghĩa hơn. Chúng tôi sẽ giúp bạn truyền tải thông điệp này một cách tinh tế và đẹp mắt.',
    'personalize.reasonsTitle':
      'Lý Do Nên Chọn Personalized Gift Từ Chúng Tôi?',
    'personalize.reasons.p1.title': 'Chất Lượng Đảm Bảo',
    'personalize.reasons.p1.desc':
      'Tất cả sản phẩm quà tặng đều được làm từ nguyên liệu tự nhiên, đảm bảo chất lượng và an toàn cho sức khỏe.',
    'personalize.reasons.p2.title': 'Dịch Vụ Chuyên Nghiệp',
    'personalize.reasons.p2.desc':
      'Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn trong việc tạo ra món quà theo đúng ý muốn, mang đến sự hài lòng tuyệt đối cho khách hàng.',
    'personalize.reasons.p3.title': 'Quà Tặng Độc Đáo',
    'personalize.reasons.p3.desc':
      'Với mỗi món quà được tùy chỉnh, bạn sẽ tạo ra một sản phẩm mang đậm dấu ấn cá nhân, tạo nên sự bất ngờ và ấn tượng mạnh mẽ đối với người nhận.',
    // Personalize page additions (vn)
    'custom.personalizedSubtitle':
      'Tạo món quà đầy ý nghĩa bằng cách chọn sản phẩm, thêm lời nhắn và lựa chọn đóng gói.',
    'custom.buildCombo': 'Tạo combo của bạn',
    'customWhy.title': 'Tại sao chọn Quà Tặng Cá Nhân Hóa',
    'customWhy.description':
      'Thiết kế món quà đẹp và ý nghĩa — chọn hương vị, sắp xếp set, và thêm lời nhắn cá nhân.',

    // The Mind Behind The CODY section
    'mind.title': 'Tâm Hồn Đằng Sau CODY',
    'mind.subtitle': 'Câu chuyện, giá trị và mục đích của hành trình này.',
    'mind.name': 'Lê Bảo Long',
    'mind.role': 'Nhà sáng lập & Chủ tịch CODY',
    'mind.story':
      'Lê Bảo Long, nhà sáng lập thương hiệu CODY, khởi đầu từ một ý tưởng nhỏ thời trung học — mang hơi thở hiện đại đến món kẹo dừa truyền thống Bến Tre. Hành trình ấy giờ đây đã trở thành một sứ mệnh tôn vinh sự bền vững, văn hóa và lòng nhân ái.',
    'mind.quote':
      '“Chúng tôi không chỉ muốn mọi người nếm vị kẹo, mà còn cảm nhận được câu chuyện Việt Nam — mộc mạc nhưng đầy hy vọng.”',
    'mind.mission':
      'Qua từng viên kẹo, CODY kết nối con người khắp nơi với tinh hoa và sự ấm áp của văn hóa Việt Nam.',

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
    'instagram.title': 'TÌM CHÚNG TÔI TRÊN\nFACEBOOK',
    'instagram.subtitle': '& CHIA SẺ HÀNH TRÌNH CODY',
    'instagram.handle': 'CODY - Coconut Candy ',
    'contact.placeholder.name': 'Nhập họ và tên của bạn',
    'contact.placeholder.email': 'Nhập địa chỉ email',
    'contact.placeholder.phone': 'Nhập số điện thoại',
    'contact.instagramBanner':
      'TÌM CHÚNG TÔI TRÊN FACEBOOK & CHIA SẺ HÀNH TRÌNH CODY',
    'contact.reachOut': 'Liên hệ chúng tôi',

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
    'footer.copyright': '© 2025 CODY - KẸO DỪA. BẢN QUYỀN THUỘC VỀ CHÚNG TÔI.',

    // Product Card
    'product.addToCart': 'THÊM VÀO GIỎ',

    // Common
    'common.currency': 'VND',
    'common.readMore': 'Đọc tiếp',
    'common.learnMore': 'Tìm hiểu thêm',

    'sticker.title':
      'CUSTOMIZE STICKERS – THÊM CÁC MẪU STICKER THEO Ý THÍCH CỦA BẠN',
    'sticker.intro': 'Thêm Lời Nhắn Đặc Biệt Qua Những Chiếc Sticker Tùy Chỉnh',
    'sticker.introDes':
      'Chúng tôi hiểu rằng mỗi món quà đều chứa đựng một thông điệp riêng biệt, và đôi khi, lời nhắn không chỉ cần truyền tải qua lời nói mà còn qua hình ảnh. Với dịch vụ Customize Stickers, bạn có thể tạo ra những chiếc sticker mang đậm dấu ấn cá nhân để gửi kèm quà, thể hiện thông điệp yêu thương, cảm ơn hoặc bất kỳ lời nhắn nào bạn muốn gửi đến người nhận.',

    'sticker.reasonTitle': 'Lý Do Nên Chọn Customize Stickers?',
    'sticker.reasonCustomize': 'Tùy Chỉnh Sticker Theo Ý Muốn',
    'sticker.reasonCustomizeDes':
      'Chọn từ các mẫu sticker có sẵn hoặc tự thiết kế sticker của riêng bạn với hình ảnh, màu sắc và thông điệp riêng biệt. Mỗi sticker có thể mang đến một thông điệp đầy ý nghĩa và sự sáng tạo cho người nhận.',
    'sticker.reasonMessage': 'Lời Nhắn Độc Đáo',
    'sticker.reasonMessageDes':
      'Bên cạnh các mẫu sticker được thiết kế sẵn, bạn còn có thể thêm các câu nói yêu thích, lời chúc mừng, hay bất kỳ thông điệp nào bạn muốn gửi đến người nhận. Đây là cách tuyệt vời để tạo ra món quà cá nhân hóa thật sự ý nghĩa.',
    'sticker.reasonQuality': 'Chất Lượng Sticker Cao Cấp',
    'sticker.reasonQualityDes':
      'Các mẫu sticker được in trên chất liệu cao cấp, bền đẹp, sắc nét, đảm bảo không bị phai màu theo thời gian, giúp món quà của bạn luôn tươi mới và ấn tượng.',

    'sticker.customizationTitle': 'Dễ Dàng Tùy Chỉnh Và Thêm Vào Quà Tặng',
    'sticker.chooseDesign': 'Chọn Mẫu Sticker',
    'sticker.chooseDesignDes':
      'Bạn có thể chọn từ nhiều mẫu sticker dễ thương, sinh động và phong phú mà chúng tôi cung cấp. Hoặc, nếu có ý tưởng riêng, bạn hoàn toàn có thể tải lên thiết kế của mình và chúng tôi sẽ in cho bạn.',
    'sticker.addToGift': 'Thêm Sticker Vào Quà Tặng',
    'sticker.addToGiftDes':
      'Sau khi lựa chọn mẫu sticker, bạn có thể dễ dàng thêm chúng vào giỏ quà hoặc bộ quà tặng của mình. Sticker sẽ được gói cẩn thận và gửi kèm với món quà để tạo thêm sự bất ngờ và thú vị cho người nhận.',
    'sticker.addPersonalMessage': 'Lời Nhắn Cá Nhân',
    'sticker.addPersonalMessageDes':
      'Bạn có thể yêu cầu chúng tôi in một lời nhắn cá nhân kèm theo sticker để tạo thêm sự đặc biệt. Lời nhắn này có thể là một câu chúc mừng, một lời cảm ơn hoặc bất kỳ thông điệp nào bạn muốn gửi gắm.',

    'sticker.finalTitle':
      'Tạo Ra Món Quà Đặc Biệt Với Những Chiếc Sticker Tùy Chỉnh',
    'sticker.finalDes':
      'Chúng tôi tin rằng mỗi món quà không chỉ là vật phẩm trao tặng mà còn là cách để bạn bày tỏ tình cảm và sự quan tâm. Hãy để những chiếc Customize Stickers giúp bạn truyền tải thông điệp yêu thương và tạo nên một món quà thật sự ý nghĩa.',
    'sticker.cta':
      'Hãy bắt đầu tùy chỉnh sticker ngay hôm nay để mang đến những món quà tuyệt vời, đầy ắp tình cảm và sự sáng tạo!',

    'error.nameCombo': 'Vui lòng nhập tên combo.',
    'error.noteCombo': 'Vui lòng nhập ghi chú',
    'error.buyerName': 'Vui lòng nhập tên người mua.',
    'error.buyerPhone': 'Vui lòng nhập số điện thoại.',
    'error.addressUrl': 'Vui lòng nhập địa chỉ',
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
