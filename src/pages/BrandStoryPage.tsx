import React from 'react';
import { Heart, Users, Leaf, Award, ArrowRight } from 'lucide-react';

const BrandStoryPage = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Khởi nguồn',
      description: 'Ý tưởng về CODY được hình thành từ tình yêu với quê hương Bến Tre và mong muốn phát triển bền vững.',
      image: 'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2019',
      title: 'Thành lập',
      description: 'Chính thức thành lập công ty và ra mắt sản phẩm kẹo dừa đầu tiên với quy mô nhỏ.',
      image: 'https://images.pexels.com/photos/8835098/pexels-photo-8835098.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2021',
      title: 'Mở rộng',
      description: 'Phát triển đa dạng sản phẩm và mở rộng thị trường ra toàn quốc.',
      image: 'https://images.pexels.com/photos/11022492/pexels-photo-11022492.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      year: '2024',
      title: 'Tương lai xanh',
      description: 'Cam kết phát triển bền vững và trở thành thương hiệu kẹo dừa hàng đầu Việt Nam.',
      image: 'https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Bền vững',
      description: 'Cam kết bảo vệ môi trường và phát triển bền vững trong mọi hoạt động sản xuất kinh doanh.'
    },
    {
      icon: Heart,
      title: 'Chất lượng',
      description: 'Luôn đặt chất lượng sản phẩm lên hàng đầu, từ nguyên liệu đến quy trình sản xuất.'
    },
    {
      icon: Users,
      title: 'Cộng đồng',
      description: 'Hỗ trợ và phát triển cùng cộng đồng nông dân trồng dừa tại Bến Tre.'
    },
    {
      icon: Award,
      title: 'Truyền thống',
      description: 'Gìn giữ và phát huy các giá trị truyền thống trong nghề làm kẹo dừa Việt Nam.'
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
          <h1 className="text-4xl md:text-6xl font-bold text-white font-playfair mb-6">
            Câu chuyện
            <span className="block text-cream">CODY</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Từ mảnh đất Bến Tre thân thương, chúng tôi đã và đang viết nên câu chuyện 
            về những viên kẹo dừa mang hương vị truyền thống và tinh thần bền vững.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-6">
                Khởi nguồn từ xứ Dừa
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  Bến Tre - mảnh đất được thiên nhiên ưu ái với hàng triệu cây dừa xanh mướt, 
                  nơi mà tiếng sóng Mekong hòa quyện cùng tiếng lá dừa xào xạc. Đây chính là 
                  nơi thai nghén nên thương hiệu CODY.
                </p>
                <p>
                  Với tình yêu sâu sắc dành cho quê hương và mong muốn giữ gìn những giá trị 
                  truyền thống, chúng tôi bắt đầu hành trình tạo ra những sản phẩm kẹo dừa 
                  không chỉ thơm ngon mà còn thân thiện với môi trường.
                </p>
                <p>
                  Mỗi viên kẹo CODY đều chứa đựng tâm huyết của những người nông dân chăm sóc 
                  vườn dừa và sự tận tâm của đội ngũ nghệ nhân có kinh nghiệm hàng chục năm 
                  trong nghề làm kẹo dừa truyền thống.
                </p>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
              Hành trình phát triển
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Từ những bước đi đầu tiên đến hiện tại, CODY luôn kiên định với sứ mệnh 
              mang đến sản phẩm chất lượng và phát triển bền vững.
            </p>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                <div className="lg:w-1/2">
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                </div>
                
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="inline-block bg-primary-green text-white px-4 py-2 rounded-full text-2xl font-bold mb-4">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold text-warm-brown mb-4 font-playfair">
                    {milestone.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của CODY và tạo nên sự khác biệt 
              trong từng sản phẩm chúng tôi tạo ra.
            </p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-6">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            CODY cam kết mang đến những sản phẩm kẹo dừa chất lượng cao, thân thiện với môi trường, 
            đồng thời góp phần bảo tồn và phát triển nghề truyền thống của quê hương Bến Tre. 
            Chúng tôi tin rằng sự phát triển bền vững không chỉ tốt cho doanh nghiệp mà còn 
            tốt cho cộng đồng và hành tinh chúng ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-green font-semibold rounded-full hover:bg-cream transition-colors group"
            >
              Khám phá sản phẩm
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary-green transition-colors"
            >
              Liên hệ với chúng tôi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandStoryPage;