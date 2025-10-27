import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../assets/images/banner-1.jpg';
import cusPrize from '../assets/images/custom-prize.png';
import cusSticker from '../assets/images/custom-sticker.png';
import lblImg from '../assets/images/lbl-img.jpg';
import story1 from '../assets/images/story-1.jpg';
import time1 from '../assets/images/time-1.jpg';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useAllCategories } from '../hooks/useCategories';
import { useProductSearch } from '../hooks/useProducts';
import { Category } from '../types/category';
import { ProductUtils } from '../utils/product';
const HomePage = () => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useAllCategories();
  const rawCategories: Category[] = categoriesData?.data?.content || [];

  // Use all categories from API directly
  const categories = rawCategories.map((category) => ({
    id: category.id,
    slug: category.slug,
    label: category.name, // Use the name from API directly
  }));

  // Fetch products by selected category
  const { data: productsData, isLoading: productsLoading } = useProductSearch({
    page: 0,
    size: 8,
    sortBy: 'name',
    sortDirection: 'ASC',
    categoryId: selectedCategoryId || undefined,
  });

  const featuredProducts =
    productsData?.data?.content?.map(ProductUtils.toLegacyFormat).slice(0, 4) ||
    [];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;

      // Calculate actual scroll progress (0-100%)
      let progress = 0;
      if (maxScroll > 0) {
        progress = (scrollLeft / maxScroll) * 100;
        // Ensure we can reach 100% when scrolled to the end
        if (scrollLeft >= maxScroll - 1) {
          // Account for sub-pixel rounding
          progress = 100;
        }
      }

      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scrollbar logic
  // removed unused scrollToPosition helper

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

      // removed tracking of initial positions (unused)
    } else {
      const clickPosition = (e.clientX - trackRect.left) / trackRect.width;
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollLeft =
        clickPosition * (scrollWidth - clientWidth);
    }

    setIsDragging(true);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // chặn cuộn dọc
      setScrollProgress((prev) => {
        let newProgress = prev + e.deltaY * 0.2; // điều chỉnh tốc độ cuộn
        if (newProgress < 0) newProgress = 0;
        if (newProgress > 100) newProgress = 100;
        return newProgress;
      });

      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        container.scrollLeft += e.deltaY; // e.deltaY vì cuộn chuột là dọc
      }
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      track.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && trackRef.current && scrollContainerRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const trackWidth = trackRect.width;
      const thumbWidth = trackWidth * 0.2;

      const newThumbLeft = e.clientX - dragOffset;

      const maxThumbPosition = trackWidth - thumbWidth;
      const thumbPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbLeft - trackRect.left)
      );
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

  const facebookPosts = [
    {
      link: 'https://www.facebook.com/share/v/1BVqsvjkXq/',
      imgUrl: time1,
    },
    {
      link: 'https://www.facebook.com/share/p/16Egw66vKJ/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/565698891_122237208824084615_1629009953946577084_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hjI6C49oY_kQ7kNvwFaG3lm&_nc_oc=AdngSz44qqYLJQ7ebn8SUJJgPeIGHKe-ZLan29GUvaYW7pce0BM564uP71CpVZ7pUvI&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=2tEhXWs8Ep-GgDMUbU0OCA&oh=00_AfeKoaR1YVv_Ms9G3Tg_u_tGo2nUfEviBr6eiHNFM6K69Q&oe=6903F12E',
    },
    {
      link: 'https://www.facebook.com/share/p/1T7X4tobZz/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/561871168_122237207948084615_8484963236554080371_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=F_01i3_yxcEQ7kNvwF5biB9&_nc_oc=Adm-ZSNHGIWffFQ6ZjhWn-kcKuSrU8zusZgsJm8evH8lHmmzw5vcRduLZ_A7kvh78aE&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=WHGSzEBhv_mMWyLY1kHTiQ&oh=00_AffQw_ZebjrAHtJ7mz0fsiH47rhAnVmxXVY3fcl_K0-vSA&oe=690404FA',
    },
    {
      link: 'https://web.facebook.com/share/p/1BUmxE7KH4/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/564522614_122237205944084615_5777391985360857015_n.jpg?stp=dst-jpg_p960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cu8_USnBHoIQ7kNvwFWHVg6&_nc_oc=Adk-cTxSplFuDUQ87U6SsjgKSgQ4vKTGYufM2PArv_Ekf24Kf60i6HgKa8P6T3n3KX4&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=Y4ShW-Nmm-GtAj6N3_Fvmg&oh=00_Afcbjy0F4OPPV6JGubHCpfzE1k789RnFNuGBdbTEojI1dg&oe=6903E496',
    },
    {
      link: 'https://web.facebook.com/share/p/19aombsEDD/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/565347036_122237201822084615_5858726072459073814_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-1axYCyMXZEQ7kNvwET-MsS&_nc_oc=Adko4QDmw29LyMJJmOKEzwv1UmjWiy9OWGT4BbCRj8aK4MfEwhKh83WRTPQmubz2reg&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=stahZD-r25Gx0cwhL1UoXg&oh=00_AfcUnEeyAvKIn07w17-8AyEQovjzgNsSgEEFYQuoRYhUUA&oe=6904098A',
    },
    {
      link: 'https://web.facebook.com/share/p/14V2SV5eRUN/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/565159445_122237199842084615_8472914943162920057_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=OigyhNdpxIcQ7kNvwE0RaRk&_nc_oc=Admv7JFn4Bwn7ix24KSjyKq5zv9I8ahPJmkDNNuTG6WeL8OsX9jl_nyFMhnWnY_rll0&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=xFsCWK73acqzV1AIg-A8tw&oh=00_AfdG-i041vSWZjymKGJU_NFz_5AAIH6OW5mAopnR5b_-Lw&oe=6903F530',
    },

    {
      link: 'https://web.facebook.com/share/p/1Gq2M3dZgN',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/561326841_122237054918084615_7218480736850266881_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=v84FSVGAFBQQ7kNvwF6jQTX&_nc_oc=AdkjfqGvhKbBDYcIfBKhcW4-hyCHzGb_iR2gLWru-2Ph3qQSGN66afwkh1JwccjENaI&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=a-8WVF3YMp31Y-4WmxIyZQ&oh=00_Aff7NBJUXfnFX4xp17y0P0akbYrgdm60PrVRWxu_3IBlDQ&oe=6903FEE5',
    },
    {
      link: 'https://web.facebook.com/share/p/1AKW3kg4Dq/',
      imgUrl:
        'https://scontent.fsgn21-1.fna.fbcdn.net/v/t39.30808-6/561060046_122237053208084615_4498484208415462895_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=hNerj9TQEu8Q7kNvwGZ2Nhg&_nc_oc=AdmWqU-DZnH0dNG4qu0zlW7SbEkUXUxCeoa7PWzd6bHrmGnCQe8jkFgVeHDdPtIddPg&_nc_zt=23&_nc_ht=scontent.fsgn21-1.fna&_nc_gid=E80S7CFlkObyp3QdR_XU5Q&oh=00_AfdO3upQ9kwc8wj-AwKe4QgdYjhoHCxZ7kDNmQ-nMUXT3A&oe=69040212',
    },
  ];

  useEffect(() => {
    // Preload ảnh footer để đảm bảo load sẵn trong bộ nhớ
    const img = new Image();
    img.src = banner1;
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Hero Section - Bold & Minimal */}
      <section className="relative overflow-hidden flex flex-col">
        {/* Coconut and Traditional Sweets Background */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[700px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${banner1})`,
              backgroundSize: 'cover',
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
          >
            {/* Overlay for text readability and brand color */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-primary-green/80 via-accent-green/70 to-light-green/60"></div> */}
          </div>

          <div className="absolute bottom-44 left-1/2 -translate-x-1/2 z-10 w-full max-w-7xl px-3 sm:px-4 lg:px-8 flex flex-col items-center">
            {/* Hero Title */}
            {/* <div className="text-center mb-10 sm:mb-20">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white font-montserrat mb-2 sm:mb-4 leading-none tracking-tight">
                CODY
              </h1>
              <p className="text-base sm:text-3xl md:text-4xl font-light text-cream font-inter italic">
                {t('hero.subtitleCandy')}
              </p>
            </div> */}

            {/* Responsive button */}
            <div className="flex justify-center gap-4 mt-4">
              <Link
                to="/brand-story?scrollTo=exploreSection"
                state={{ scrollTo: 'exploreSection' }}
                className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 bg-white text-primary-green font-bold text-base sm:text-lg tracking-wider rounded-md hover:bg-dark-green hover:text-white transition-all duration-300 group shadow-lg"
              >
                {t('hero.explore')}
              </Link>

              <Link
                to="/custom"
                className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 bg-white text-primary-green font-bold text-base sm:text-lg tracking-wider rounded-md hover:bg-dark-green hover:text-white transition-all duration-300 group shadow-lg"
              >
                {t('hero.special')}
              </Link>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="relative bg-gradient-to-r from-light-green to-primary-green py-10 sm:py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <p className="text-white text-base sm:text-lg md:text-xl font-medium mb-6 sm:mb-8 leading-relaxed lg:leading-loose uppercase px-1">
              {t('hero.journey')}
            </p>

            <Link
              to="/brand-story"
              className="inline-block bg-white text-primary-green px-6 sm:px-8 py-2 sm:py-3 font-semibold text-base sm:text-lg tracking-wider rounded-md border-2 border-transparent hover:border-primary-green hover:text-dark-green hover:font-extrabold transition-all"
            >
              {t('hero.journeyCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-warm-brown font-inter mb-2 tracking-wide italic">
                {t('products.homemade')}
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-warm-brown font-montserrat mb-2 tracking-tight">
                {t('products.title')}
              </h2>
              <h2 className="text-3xl md:text-4xl font-black text-warm-brown font-montserrat tracking-tight">
                {t('products.subtitle')}
              </h2>
            </div>
            {/* Product Categories Navigation */}
            <div className="mb-4 sm:mb-6 max-w-full mx-auto overflow-hidden">
              {categoriesLoading ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">Loading categories...</p>
                </div>
              ) : categoriesError ? (
                <div className="text-center py-4">
                  <p className="text-red-500">Error loading categories</p>
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No categories available</p>
                </div>
              ) : (
                <div className="px-2 sm:px-4">
                  <div
                    ref={scrollContainerRef}
                    className="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide pb-4 max-w-full"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                    }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`text-sm font-medium text-warm-brown hover:text-primary-green transition-colors tracking-wide whitespace-nowrap flex-shrink-0 px-2 py-1 rounded-md hover:bg-primary-green/10 ${
                          selectedCategoryId === category.id
                            ? 'bg-primary-green text-white'
                            : ''
                        }`}
                        onClick={() => setSelectedCategoryId(category.id)}
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                  {/* Scrollbar */}
                  <div className="w-full mt-4">
                    <div
                      ref={trackRef}
                      className="w-full h-4 bg-gray-200 rounded-sm cursor-pointer relative select-none"
                      onMouseDown={handleTrackMouseDown}
                      onTouchStart={(e) => {
                        const touch = e.touches[0];
                        handleTrackMouseDown({
                          clientX: touch.clientX,
                        } as React.MouseEvent);
                      }}
                    >
                      <div
                        ref={thumbRef}
                        className="h-4 bg-primary-green rounded-sm absolute top-0 transition-none"
                        style={{
                          left: `${(scrollProgress * (100 - 20)) / 100}%`,
                          width: '20%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {productsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // No products available
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">{t('common.loading')}</p>
              </div>
            )}
          </div>
          <div className="text-center">
            <Link
              to="/products"
              className="inline-block bg-primary-green text-white px-8 py-3 font-bold tracking-wider rounded-md hover:bg-primary-green/90 transition-colors shadow-lg"
            >
              {t('products.shopFull')}
            </Link>
          </div>
        </div>
      </section>

      {/* NOTE: Modal is opened from the dedicated personalize-gift page. */}

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
                    src={cusPrize}
                    alt="Corporate Gifts"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                    width="800"
                    height="600"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Title and Button Below Image */}
                <div className="bg-primary-green text-white p-6 sm:p-8 text-center">
                  <h3 className="uppercase text-xl md:text-2xl font-black font-montserrat mb-4 tracking-tight drop-shadow-sm">
                    {t('custom.personalizedGift')}
                  </h3>
                  <Link
                    to="/custom"
                    state={{ tab: 'gift' }}
                    className="uppercase bg-white text-primary-green px-6 py-3 font-bold tracking-wider rounded-md border-2 border-transparent  hover:border-dark-green  hover:text-dark-green hover:font-extrabold  transition-all inline-block"
                  >
                    {t('custom.learnMore')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Celebration Cakes */}
            <div className="relative overflow-hidden group">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cusSticker}
                    alt="Celebration Cakes"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                </div>

                {/* Title and Button Below Image */}
                <div className="bg-accent-green text-white p-8 text-center">
                  <h3 className="uppercase text-xl md:text-2xl font-black font-montserrat mb-4 tracking-tight">
                    {t('custom.customizeStickers')}
                  </h3>
                  <Link
                    to="/custom"
                    state={{ tab: 'sticker' }}
                    className="uppercase bg-white text-accent-green px-6 py-3 font-bold tracking-wider rounded-md border-2 border-transparent  hover:border-dark-green hover:text-dark-green hover:font-extrabold  transition-all inline-block"
                  >
                    {t('custom.learnMore')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Experience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Workshop Section */}
            <div className="relative">
              <div className="bg-accent-green text-white p-12 lg:p-16 h-full flex flex-col justify-center items-center text-center">
                <div className="p-1 mb-8 mx-auto">
                  <h3 className="text-lg md:text-2xl font-black tracking-wider px-4 py-2 whitespace-pre-line">
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
                    to="/brand-story?scrollTo=gateSection"
                    state={{ scrollTo: 'gateSection' }}
                    className="inline-block bg-white text-accent-green px-8 py-3 font-black tracking-wider rounded-md hover:bg-dark-green hover:text-white transition-all duration-300"
                  >
                    {t('workshop.discover')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="aspect-square lg:aspect-auto">
              <img
                src={story1}
                alt="Workshop Experience"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Team Image Section */}
            <div className="order-2 lg:order-1 aspect-square lg:aspect-auto">
              <img
                src={lblImg}
                alt="LBL"
                className="w-full h-full object-cover"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            {/* About Section */}
            <div className="order-1 lg:order-2 relative">
              <div className="bg-light-green text-white p-12 lg:p-16 h-full flex flex-col justify-center items-center text-center">
                <div className="p-1 mb-8 mx-auto">
                  <h3 className="text-lg md:text-2xl font-black tracking-wider px-4 py-2 whitespace-pre-line">
                    {t('about.title')}
                  </h3>
                </div>
                <p className="text-base leading-relaxed font-inter mb-12 whitespace-pre-line">
                  {t('about.description')}
                </p>

                <div className="text-center">
                  <Link
                    to="/brand-story?scrollTo=mindSection"
                    state={{ scrollTo: 'mindSection' }}
                    className="inline-block bg-white text-light-green px-8 py-3 font-black tracking-wider rounded-md hover:bg-dark-green hover:text-white transition-all duration-300"
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
            <div className="flex items-center justify-center mb-2 px-2">
              <a
                href="https://www.facebook.com/profile.php?id=61552538454281"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-green font-montserrat tracking-tight hover:text-accent-green transition-colors break-all sm:break-normal overflow-hidden"
                style={{
                  wordBreak: 'break-all',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {t('instagram.handle')}
              </a>
            </div>
            <p className="text-xs sm:text-sm uppercase tracking-widest font-medium text-gray-700 font-inter px-2">
              {t('contact.instagramBanner')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {facebookPosts.map((image, index) => (
              <Link
                to={image.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className="aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={image.imgUrl}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
