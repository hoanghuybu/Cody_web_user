import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Leaf, Star, ChevronRight, Instagram, Play } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { featuredProducts } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [thumbStartX, setThumbStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [selectedPost, setSelectedPost] = useState<null | number>(null);


  const categories = [
    { key: 'products.original', label: t('products.original') },
    { key: 'products.durian', label: t('products.durian') },
    { key: 'products.durianPeanut', label: t('products.durianPeanut') },
    { key: 'products.mixBox', label: t('products.mixBox') },
    { key: 'products.coffee', label: t('products.coffee') },
    { key: 'products.strawberry', label: t('products.strawberry') },
    { key: 'products.chocolate', label: t('products.chocolate') },
    { key: 'products.mango', label: t('products.mango') },
    { key: 'products.pandan', label: t('products.pandan') },
    { key: 'products.giftSet', label: t('products.giftSet') },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;

      // Calculate actual scroll progress (0-100%)
      let progress = 0;
      if (maxScroll > 0) {
        progress = (scrollLeft / maxScroll) * 100;
        // Ensure we can reach 100% when scrolled to the end
        if (scrollLeft >= maxScroll - 1) { // Account for sub-pixel rounding
          progress = 100;
        }
      }

      setScrollProgress(progress);
    }
  };

  const openModal = (index: number) => {
    setSelectedPost(index);
    document.body.style.overflow = 'hidden';
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scrollbar logic
  const scrollToPosition = (clientX: number) => {
    if (!trackRef.current || !scrollContainerRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;

    const relativePosition = Math.max(0, Math.min(1, (clientX - trackRect.left) / trackWidth));

    const { scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    scrollContainerRef.current.scrollLeft = relativePosition * maxScroll;
  };

  const handleTrackMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const thumbElement = thumbRef.current;
    const trackElement = trackRef.current;

    if (!thumbElement || !trackElement || !scrollContainerRef.current) return;

    const thumbRect = thumbElement.getBoundingClientRect();
    const trackRect = trackElement.getBoundingClientRect();

    if (e.clientX >= thumbRect.left && e.clientX <= thumbRect.right) {
      const offsetInThumb = e.clientX - thumbRect.left;
      setDragOffset(offsetInThumb);

      setThumbStartX(e.clientX);
      setInitialScrollLeft(scrollContainerRef.current.scrollLeft);
    } else {
      const clickPosition = (e.clientX - trackRect.left) / trackRect.width;
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollLeft = clickPosition * (scrollWidth - clientWidth);
    }

    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && trackRef.current && scrollContainerRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;
      const thumbWidth = trackWidth * 0.2;

      const newThumbLeft = e.clientX - dragOffset;

      const maxThumbPosition = trackWidth - thumbWidth;
      const thumbPosition = Math.max(0, Math.min(maxThumbPosition, newThumbLeft - trackRect.left));
      const scrollRatio = thumbPosition / maxThumbPosition;

      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      scrollContainerRef.current.scrollLeft = scrollRatio * maxScroll;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const instagramPosts = [
    'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/11406167/pexels-photo-11406167.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=400',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section - Bold & Minimal */}
      <section className="relative overflow-hidden flex flex-col">
        {/* Coconut and Traditional Sweets Background */}
        <div className="relative h-screen flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
            }}
          >
            {/* Overlay for text readability and brand color */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/80 via-accent-green/70 to-light-green/60"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Hero Title */}
            <div className="text-center mb-20">
              <h1 className="text-6xl md:text-8xl font-black text-white font-montserrat mb-4 leading-none tracking-tight">
                CODY
              </h1>
              <p className="text-3xl md:text-4xl font-light text-cream font-inter italic">
                Coconut Candy
              </p>
            </div>

            {/* Explore Button */}
            <div className="text-center">
              <Link
                to="/products"
                className="inline-flex items-center px-12 py-4 bg-white text-primary-green font-bold text-lg tracking-wider rounded-full hover:bg-cream transition-all duration-300 group shadow-lg"
              >
                {t('hero.explore')}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative bg-gradient-to-r from-light-green to-primary-green py-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-lg md:text-xl font-medium mb-8 leading-relaxed uppercase">
              Cody is a journey that connects the world to the cultural essence of Ben Tre.<br />
              through handcrafted coconut candy – the iconic sweet of Vietnam's riverlands.<br />
              Here, tradition, craftsmanship, and local stories blend into a truly immersive<br />
              experience.
            </p>

            <Link
              to="/brand-story"
              className="inline-block bg-white text-primary-green px-8 py-3 font-bold text-lg tracking-wider rounded-full hover:bg-cream transition-colors"
            >
              SPEND A DAY WITH US
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Clean Grid */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-warm-brown font-inter mb-2 tracking-wide italic">
                {t('products.homemade')}
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-warm-brown font-montserrat mb-4 tracking-tight">
                {t('products.title')}
              </h2>
              <h2 className="text-3xl md:text-4xl font-black text-warm-brown font-montserrat tracking-tight">
                {t('products.subtitle')}
              </h2>
            </div>

            {/* Product Categories Navigation */}
            <div className="mb-6">
              <div
                ref={scrollContainerRef}
                className="flex gap-8 overflow-x-auto scrollbar-hide pb-4 px-4 max-w-4xl mx-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categories.map((category, index) => (
                  <button
                    key={category.key}
                    className="text-sm font-medium text-warm-brown hover:text-primary-green transition-colors tracking-wide whitespace-nowrap flex-shrink-0 px-2 py-1 rounded-full hover:bg-primary-green/10"
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Native-like Horizontal Scrollbar */}
              <div className="w-full max-w-4xl mx-auto mt-4">
                <div
                  ref={trackRef}
                  className="w-full h-4 bg-gray-200 rounded-sm cursor-pointer relative select-none"
                  onMouseDown={handleTrackMouseDown}
                >
                  <div
                    ref={thumbRef}
                    className="h-4 bg-primary-green rounded-sm absolute top-0 transition-none"
                    style={{
                      left: `${scrollProgress * (100 - 20) / 100}%`,
                      width: '20%'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <button className="bg-red-500 text-white px-8 py-3 font-bold tracking-wider hover:bg-red-600 transition-colors">
              {t('products.shopFull')}
            </button>
          </div>
        </div>
      </section>

      {/* Customization Section - Split Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-warm-brown font-montserrat mb-4 tracking-tight whitespace-pre-line">
              {t('custom.title')}
            </h2>
            <p className="text-lg text-gray-600 tracking-wide whitespace-pre-line">
              {t('custom.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Corporate Gifts */}
            <div className="relative overflow-hidden group">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6697264/pexels-photo-6697264.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Corporate Gifts"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Title and Button Below Image */}
                <div className="bg-primary-green text-white p-8 text-center">
                  <h3 className="uppercase text-xl md:text-2xl font-black font-montserrat mb-4 tracking-tight">
                    {t('custom.personalizedGift')}
                  </h3>
                  <button className="uppercase bg-white text-primary-green px-6 py-3 font-bold tracking-wider hover:bg-cream transition-colors">
                    {t('custom.learnMore')}
                  </button>
                </div>
              </div>
            </div>

            {/* Celebration Cakes */}
            <div className="relative overflow-hidden group">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Celebration Cakes"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Title and Button Below Image */}
                <div className="bg-accent-green text-white p-8 text-center">
                  <h3 className="uppercase text-xl md:text-2xl font-black font-montserrat mb-4 tracking-tight">
                    {t('custom.customizeStickers')}
                  </h3>
                  <button className="uppercase bg-white text-accent-green px-6 py-3 font-bold tracking-wider hover:bg-cream transition-colors">
                    {t('custom.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Experience Section */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Workshop Section */}
            <div className="relative">
              <div className="bg-teal-dark text-white p-12 lg:p-16 h-full flex flex-col justify-center items-center text-center">
                <div className="border-2 border-white p-1 mb-8 mx-auto">
                  <h3 className="text-lg md:text-xl font-black tracking-wider px-4 py-2 whitespace-pre-line">
                    {t('workshop.title')}
                  </h3>
                </div>

                <div className="space-y-6 mb-12">
                  <p className="text-base leading-relaxed font-inter whitespace-pre-line">
                    {t('workshop.description1')}
                  </p>

                  <p className="text-base leading-relaxed font-inter whitespace-pre-line">
                    {t('workshop.description2')}
                  </p>

                  <p className="text-base leading-relaxed font-inter whitespace-pre-line">
                    {t('workshop.description3')}
                  </p>
                </div>

                <div className="text-center">
                  <Link
                    to="/brand-story"
                    className="inline-block bg-white text-teal-dark px-8 py-3 font-black tracking-wider hover:bg-cream transition-all duration-300"
                  >
                    {t('workshop.discover')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="aspect-square lg:aspect-auto">
              <img
                src="https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Workshop Experience"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Team Image Section */}
            <div className="aspect-square lg:aspect-auto">
              <img
                src="https://images.pexels.com/photos/11406167/pexels-photo-11406167.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="CODY Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* About Section */}
            <div className="relative">
              <div className="bg-light-green text-white p-12 lg:p-16 h-full flex flex-col justify-center items-center text-center">
                <h3 className="text-3xl md:text-4xl font-black font-montserrat mb-8 tracking-tight leading-tight whitespace-pre-line">
                  {t('about.title')}
                </h3>

                <p className="text-base leading-relaxed font-inter mb-12 whitespace-pre-line">
                  {t('about.description')}
                </p>

                <div className="text-center">
                  <Link
                    to="/brand-story"
                    className="inline-block bg-white text-light-green px-8 py-3 font-black tracking-wider hover:bg-cream transition-all duration-300"
                  >
                    {t('about.getToKnow')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl md:text-5xl font-bold text-primary-green font-montserrat tracking-tight hover:text-accent-green transition-colors"
              >
                @CODY_COCONUT_CANDY
              </a>
            </div>
            <p className="text-sm uppercase tracking-widest font-medium text-gray-700 font-inter">
              FIND US ON INSTAGRAM & SHARE OUR CODY ADVENTURE
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {instagramPosts.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden group cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Instagram Modal */}
          {selectedPost !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
              onClick={closeModal}
            >
              {/* Close button */}
              <button
                className="fixed top-6 right-6 z-[60] text-white hover:text-gray-300"
                onClick={closeModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Previous button */}
              {selectedPost > 0 && (
                <button
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-[60] text-white opacity-75 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(selectedPost - 1);
                  }}
                >
                  <ChevronRight className="w-10 h-10 transform rotate-180" />
                </button>
              )}

              {/* Next button */}
              {selectedPost < instagramPosts.length - 1 && (
                <button
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] text-white opacity-75 hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPost(selectedPost + 1);
                  }}
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              )}

              <div
                className="relative max-w-6xl w-full max-h-[90vh] flex bg-white overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left side */}
                <div className="w-3/5 bg-black flex items-center justify-center relative">
                  <img
                    src={instagramPosts[selectedPost]}
                    alt={`Instagram post ${selectedPost + 1}`}
                    className="w-full h-auto max-h-[90vh] object-contain"
                  />
                </div>


                {/* Right side*/}
                <div className="w-2/5 flex flex-col bg-white h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center p-4 border-b">
                    <div className="h-8 w-8 bg-gray-200 overflow-hidden mr-3">
                      <Instagram href="#" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold">CODY_COCONUT_CANDY</div>
                  </div>

                  {/* Caption */}
                  <div className="p-4 flex-1 overflow-y-auto">
                    <div className="flex mb-4">
                      <div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-4">
                    </div>
                  </div>
                  <div className="text-gray-500 text-center text-xs p-4 border-t">
                    September 25, 2025
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default HomePage;