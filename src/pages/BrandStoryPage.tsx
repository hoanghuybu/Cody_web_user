import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import banner2 from '../assets/images/banner-2.jpg';
import experience from '../assets/images/experience.jpg';
import founder1 from '../assets/images/founder-1.jpg';
import founder2 from '../assets/images/founder-2.jpg';
import founder3 from '../assets/images/founder-3.jpg';
import founder4 from '../assets/images/founder-4.png';
import founder5 from '../assets/images/founder-5.png';
import lblImg from '../assets/images/lbl-img.jpg';
import time1 from '../assets/images/time-1.jpg';
import time2 from '../assets/images/time-2.jpg';
import time3 from '../assets/images/time-3.jpg';
import time4 from '../assets/images/time-4.jpg';
import time5 from '../assets/images/time-5.png';
import time6 from '../assets/images/time-6.png';
import time7 from '../assets/images/time-7.png';
import time8 from '../assets/images/time-8.jpg';
import video1 from '../assets/videos/explore-1.mov';
import video2 from '../assets/videos/explore-2.mov';
import { useLanguage } from '../context/LanguageContext';

const BrandStoryPage = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const scrollTo = searchParams.get('scrollTo');
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const mindSectionRef = useRef<HTMLDivElement | null>(null);
  const gateSectionRef = useRef<HTMLDivElement | null>(null);
  const exploreSectionRef = useRef<HTMLDivElement | null>(null);

  // 🎬 Auto alternate video playback
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (v1 && v2) {
      v1.pause();
      v2.play().catch(() => {});
      v2.addEventListener('ended', () => v1.play().catch(() => {}));
      v1.addEventListener('ended', () => v2.play().catch(() => {}));
    }
    const img = new Image();
    img.src = banner2;
    return () => {
      v1?.pause();
      v2?.pause();
    };
  }, []);

  const instagramPosts = [time1, time2, time3, time4];
  const instagramPosts2 = [time5, time6, time7, time8];

  useEffect(() => {
    if (!scrollTo) return;
    if (scrollTo === 'mindSection') {
      // delay nhỏ để đảm bảo DOM render xong
      setTimeout(() => {
        mindSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    if (scrollTo === 'gateSection') {
      setTimeout(() => {
        gateSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }

    if (scrollTo === 'exploreSection') {
      setTimeout(() => {
        exploreSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-cream">
      {/* 🌿 HERO SECTION: Explore Culture */}
      <section className="relative w-full h-fit flex items-center overflow-hidden">
        <div className="w-screen aspect-[12500/4558] bg-gray-200 relative overflow-hidden">
          <img
            src={banner2}
            alt="banner"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        {/* <div className="relative text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
            {t("brand.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            {t("brand.heroSubtitle")}
          </p>
        </div> */}
      </section>
      {/* 🌿 ABOUT CODY */}
      <section className="py-24 bg-white flex items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-6">
            {t('brand.originTitle')}
          </h2>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>{t('brand.originP1')}</p>
            <p>{t('brand.originP2')}</p>
            <p>{t('brand.originP3')}</p>
          </div>
        </div>
      </section>
      {/* 🌴 CULTURAL STORY OF BEN TRE & COCONUT CANDY */}
      <section ref={exploreSectionRef} className="py-24 bg-[#fffdea]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
          {/* LEFT: Text */}
          <div className="text-left lg:pr-8">
            <h2 className="text-4xl  md:text-5xl font-playfair font-bold text-warm-brown mb-6">
              {t('cultural.title')}
            </h2>
            <div className="text-lg text-justify text-gray-700 leading-relaxed space-y-4">
              <p>{t('cultural.p1')}</p>
              <p>{t('cultural.p2')}</p>
              <p>{t('cultural.p3')}</p>
            </div>
          </div>
          {/* RIGHT: Image */}
          <div className="flex justify-center">
            <img
              src={experience}
              alt="The Cultural Story of Ben Tre & Coconut Candy"
              className="rounded-2xl shadow-xl w-full max-w-lg object-contain"
            />
          </div>
        </div>
      </section>

      {/* 🌱 OUR PURPOSE */}
      <section className="py-20 bg-primary-green">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            {t('purpose.title')}
          </h2>
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-10">
            {t('purpose.des')}
          </p>
          <div className="text-left max-w-4xl mx-auto text-white text-lg space-y-5">
            <p className="text-justify">
              <b className="text-cream">{t('purpose.label1')}:</b>{' '}
              {t('purpose.labelDes1')}
            </p>
            <p className="text-justify">
              <b className="text-cream">{t('purpose.label2')}:</b>{' '}
              {t('purpose.labelDes2')}
            </p>
            <p className="text-justify">
              <b className="text-cream">{t('purpose.label3')}:</b>{' '}
              {t('purpose.labelDes3')}
            </p>
          </div>
          <p className="text-2xl italic text-warm-brown font-medium mt-10">
            {t('purpose.tagLine')}
          </p>

          {/* 🎥 VIDEOS */}
          <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center max-w-6xl mx-auto">
            <video
              ref={video2Ref}
              src={video2}
              className="rounded-2xl shadow-xl w-full sm:w-[48%] aspect-video object-cover"
              controls
              muted
            />
            <video
              ref={video1Ref}
              src={video1}
              className="rounded-2xl shadow-xl w-full sm:w-[48%] aspect-video object-cover"
              controls
              muted
            />
          </div>
        </div>
      </section>
      {/*  OUR TIMELINE */}
      <section ref={gateSectionRef} className="py-20  bg-[#fffdea]">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-warm-brown mb-6">
            {t('brand.timelineTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-10">
            {t('brand.timelineSubtitle')}
          </p>
          <div className="text-justify max-w-4xl mx-auto text-gray-600 text-lg space-y-5">
            <p>
              <b className="text-warm-brown">{t('brand.milestone1Title')}:</b>{' '}
              {t('brand.milestone1Desc')}
            </p>
            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {instagramPosts.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden group cursor-pointer bg-gray-200 w-auto"
                    style={{ height: 215 }}
                    // onClick={() => openModal(index)}
                  >
                    <img
                      src={image}
                      alt={`Instagram post ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p>
              <b className="text-warm-brown">{t('brand.milestone2Title')}:</b>{' '}
              {t('brand.milestone2Desc')}
            </p>
            <p>
              <b className="text-warm-brown">{t('brand.milestone3Title')}:</b>{' '}
              {t('brand.milestone3Desc')}
            </p>
            <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                {instagramPosts2.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden group cursor-pointer bg-gray-200 w-auto"
                    style={{ height: 215 }}
                    // onClick={() => openModal(index)}
                  >
                    <img
                      src={image}
                      alt={`Instagram post ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p>
              <b className="text-warm-brown">{t('brand.milestone4Title')}:</b>{' '}
              {t('brand.milestone4Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 🕰️ TIMELINE */}
      {/* <section className="py-16 bg-[#fffdea]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
            {t('brand.timelineTitle')}
          </h2>
          <p className="text-gray-600 mb-12">{t('brand.timelineSubtitle')}</p>
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`flex flex-col lg:flex-row ${
                  i % 2 ? 'lg:flex-row-reverse' : ''
                } items-center gap-10`}
              >
                <img
                  src={m.image}
                  alt={m.title}
                  className="rounded-2xl shadow-lg w-full lg:w-1/2 object-cover"
                />
                <div className="lg:w-1/2 text-left">
                  <h3 className="text-2xl font-bold text-warm-brown font-playfair mb-3">
                    {m.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 💡 THE MIND BEHIND THE CODY */}
      <section
        ref={mindSectionRef}
        className="py-20 bg-white"
        // style={{ scrollMarginTop: '5rem' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-3">
              {t('mind.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('mind.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Portrait */}
            <div className="relative">
              <img
                src={lblImg}
                alt={t('mind.name')}
                className="rounded-2xl shadow-xl w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Right: Info + Gallery */}
            <RightFounderPanel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandStoryPage;

/* 🔄 Subcomponent: Founder Info + Auto Gallery */
const RightFounderPanel: React.FC = () => {
  const { t } = useLanguage();
  const gallery = [founder1, founder2, founder3, founder4, founder5].filter(
    Boolean
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % gallery.length),
      5000
    );
    return () => clearInterval(id);
  }, [gallery.length]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-9">
        <h3 className="text-2xl md:text-3xl font-semibold text-warm-brown font-playfair">
          {t('mind.name')}
        </h3>
        <p className="text-primary-green font-medium">{t('mind.role')}</p>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t('mind.story')}
        </p>
        <blockquote className="border-l-4 border-primary-green pl-4 italic text-gray-600 text-justify">
          {t('mind.quote')}
        </blockquote>
        <p className="text-gray-700 leading-relaxed text-justify">
          {t('mind.mission')}
        </p>
      </div>

      {/* Gallery luôn nằm ở đáy */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full mt-8">
        {gallery.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`CODY gallery ${i + 1}`}
            className={[
              'absolute inset-0 w-full h-full object-contain rounded-2xl shadow-md transition-opacity duration-700',
              i === active ? 'opacity-100 z-20' : 'opacity-0 z-10',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
};
