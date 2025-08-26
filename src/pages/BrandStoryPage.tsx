import { Heart, Users, Leaf, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BrandStoryPage = () => {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2018',
      title: t('brand.milestone1Title'),
      description: t('brand.milestone1Desc'),
      image: 'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2019',
      title: t('brand.milestone2Title'),
      description: t('brand.milestone2Desc'),
      image: 'https://images.pexels.com/photos/8835098/pexels-photo-8835098.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2021',
      title: t('brand.milestone3Title'),
      description: t('brand.milestone3Desc'),
      image: 'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2024',
      title: t('brand.milestone4Title'),
      description: t('brand.milestone4Desc'),
      image: 'https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: t('brand.valueSustain'),
      description: t('brand.valueSustainDesc')
    },
    {
      icon: Heart,
      title: t('brand.valueQuality'),
      description: t('brand.valueQualityDesc')
    },
    {
      icon: Users,
      title: t('brand.valueCommunity'),
      description: t('brand.valueCommunityDesc')
    },
    {
      icon: Award,
      title: t('brand.valueTradition'),
      description: t('brand.valueTraditionDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-green to-accent-green">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-playfair mb-6">{t('brand.heroTitle')}<span className="block text-cream">CODY</span></h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">{t('brand.heroSubtitle')}</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-6">{t('brand.originTitle')}</h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{t('brand.originP1')}</p>
                <p>{t('brand.originP2')}</p>
                <p>{t('brand.originP3')}</p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/11406167/pexels-photo-11406167.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Vườn dừa Bến Tre"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-cream/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">{t('brand.timelineTitle')}</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">{t('brand.timelineSubtitle')}</p>
          </div>

          {/* Timeline list */}
          <div className="relative">
            {/* vertical line for mobile / tablet */}
            <div className="absolute left-4 top-0 bottom-0 hidden sm:block lg:hidden">
              <span className="block w-px h-full bg-gradient-to-b from-primary-green/40 via-primary-green/20 to-transparent" />
            </div>

            <div className="space-y-12 md:space-y-16 lg:space-y-20">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="group"
                >
                  {/* Desktop (lg+) two-column alternating */}
                  <div
                    className={`hidden lg:grid grid-cols-2 gap-12 items-center ${
                      i % 2 === 1 ? "direction-rtl lg:[direction:ltr]" : ""
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`${
                        i % 2 === 1 ? "lg:order-2" : ""
                      } relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] xl:aspect-[5/3]`}
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/15 to-transparent" />
                      <span className="absolute top-3 left-3 bg-primary-green text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                        {m.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <h3 className="text-2xl font-bold text-warm-brown font-playfair mb-4">
                        {m.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Mobile / Tablet block */}
                  <div className="lg:hidden relative pl-10 sm:pl-14">
                    {/* dot */}
                    <span className="absolute left-2 sm:left-3 top-2 w-3 h-3 rounded-full bg-primary-green shadow ring-4 ring-primary-green/15" />

                    <div className="relative overflow-hidden rounded-xl shadow-md aspect-[4/3] mb-5">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/20 to-transparent" />
                      <span className="absolute top-2 left-2 bg-primary-green text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {m.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-warm-brown font-playfair mb-3">
                      {m.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">{t('brand.valuesTitle')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('brand.valuesSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 group hover:bg-cream/50 rounded-2xl transition-colors">
                <div className="w-16 h-16 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-green/20 transition-colors">
                  <value.icon className="h-8 w-8 text-primary-green" />
                </div>
                <h3 className="text-xl font-semibold text-warm-brown mb-3 font-playfair">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-primary-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-6">{t('brand.missionTitle')}</h2>
      <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">{t('brand.missionText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-green font-semibold rounded-full hover:bg-cream transition-colors group"
            >
        {t('brand.ctaExplore')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-green transition-colors"
            >
        {t('brand.ctaContact')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandStoryPage;