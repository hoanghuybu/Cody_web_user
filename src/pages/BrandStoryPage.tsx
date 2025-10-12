import lblImg from '../assets/images/lbl-img.jpg';
// import explore1 from '../assets/images/explore-1.jpg';
import { images } from '../assets/images';
import video1 from '../assets/videos/explore-1.mov';
import video2 from '../assets/videos/explore-2.mov';
import { useLanguage } from '../context/LanguageContext';

const BrandStoryPage = () => {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2018',
      title: t('brand.milestone1Title'),
      description: t('brand.milestone1Desc'),
      image: images.milestone1,
    },
    {
      year: '2019',
      title: t('brand.milestone2Title'),
      description: t('brand.milestone2Desc'),
      image: images.milestone2,
    },
    {
      year: '2021',
      title: t('brand.milestone3Title'),
      description: t('brand.milestone3Desc'),
      image: images.milestone3,
    },
    {
      year: '2024',
      title: t('brand.milestone4Title'),
      description: t('brand.milestone4Desc'),
      image: images.milestone4,
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-green to-accent-green">
        <div className="absolute inset-0 bg-black/55"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url("${images.exploreBanner}")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {t('brand.heroTitle')}
          </h1>
          <span className=" text-4xl md:text-6xl font-bold block text-cream mb-6">
            {t('brand.heroHighlight')}
          </span>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('brand.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-6">
                {t('brand.originTitle')}
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>{t('brand.originP1')}</p>
                <p>{t('brand.originP2')}</p>
                <p>{t('brand.originP3')}</p>
                <p>{t('brand.originP4')}</p>
              </div>
            </div>

            <div className="relative">
              <img
                src={images.explore1}
                alt="Vườn dừa Bến Tre"
                className="rounded-2xl shadow-xl w-full h-auto object-contain"
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
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
              {t('brand.timelineTitle')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('brand.timelineSubtitle')}
            </p>
          </div>

          {/* Timeline list */}
          <div className="relative">
            {/* vertical line for mobile / tablet */}
            <div className="absolute left-4 top-0 bottom-0 hidden sm:block lg:hidden">
              <span className="block w-px h-full bg-gradient-to-b from-primary-green/40 via-primary-green/20 to-transparent" />
            </div>

            <div className="space-y-12 md:space-y-16 lg:space-y-20">
              {milestones.map((m, i) => (
                <div key={m.year} className="group">
                  {/* Desktop (lg+) two-column alternating */}
                  <div
                    className={`hidden lg:grid grid-cols-2 gap-12 items-center ${
                      i % 2 === 1 ? 'direction-rtl lg:[direction:ltr]' : ''
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`${
                        i % 2 === 1 ? 'lg:order-2' : ''
                      } relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] xl:aspect-[5/3]`}
                    >
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-green/15 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        <span className="text-2xl font-bold text-warm-brown font-playfair">
                          {m.title}{' '}
                        </span>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
              {t('meet.name')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('meet.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large main image */}
              <div className="col-span-2 lg:col-span-1 relative">
                <img
                  src={lblImg} // 🔹 Hình chính (chân dung)
                  alt="Le Bao Long - Founder of CODY"
                  className="rounded-2xl shadow-xl w-full h-full object-cover aspect-[4/5]"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Two smaller images */}
              <div className="hidden lg:flex flex-col gap-4">
                <img
                  src={images.about2} // 🔹 Hình thứ 2 (thiện nguyện / hoạt động)
                  alt="Founder volunteering"
                  className="rounded-2xl shadow-md object-cover aspect-[4/3] object-[center_35%]"
                />
                <img
                  src={images.about1} // 🔹 Hình thứ 3 (sự kiện / team)
                  alt="Founder at event"
                  className="rounded-2xl shadow-md object-cover aspect-[4/3]"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-warm-brown font-playfair">
                {t('meet.name')}
              </h3>
              <p className="text-primary-green font-medium">{t('meet.role')}</p>
              <p className="text-gray-700 leading-relaxed">{t('meet.des')}</p>
              <blockquote className="border-l-4 border-primary-green pl-4 italic text-gray-600">
                {t('meet.quote')}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-primary-green to-primary-green/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            {t('purpose.title').toLocaleUpperCase()}
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed mb-10">
            {t('purpose.des')}
          </p>

          {/* Mission points */}
          <div className="text-left max-w-4xl mx-auto space-y-6 text-lg text-white">
            <p>
              🌱{' '}
              <span className="font-semibold text-cream">
                {t('purpose.label1')}:
              </span>
              {t('purpose.labelDes1')}
            </p>
            <p>
              📚{' '}
              <span className="font-semibold text-cream">
                {t('purpose.label2')}:{' '}
              </span>
              {t('purpose.labelDes2')}
            </p>
            <p>
              🌏{' '}
              <span className="font-semibold text-cream">
                {t('purpose.label3')}:{' '}
              </span>
              {t('purpose.labelDes3')}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-2xl italic text-warm-brown font-medium mt-10">
            {t('purpose.tagLine')}
          </p>

          {/* Videos */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <video
              src={video1}
              controls
              className="rounded-2xl shadow-lg w-full aspect-video object-cover"
            />
            <video
              src={video2}
              controls
              className="rounded-2xl shadow-lg w-full aspect-video object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandStoryPage;
