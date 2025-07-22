import React, { useState } from 'react';
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'environment', name: 'Môi trường' },
    { id: 'lifestyle', name: 'Lối sống xanh' },
    { id: 'cuisine', name: 'Ẩm thực' },
    { id: 'culture', name: 'Văn hóa' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Tái chế bao bì: Hành động nhỏ, tác động lớn',
      excerpt: 'Khám phá cách CODY áp dụng bao bì thân thiện môi trường và cách bạn có thể tham gia vào việc bảo vệ hành tinh.',
      content: 'Trong thời đại biến đổi khí hậu, việc sử dụng bao bì thân thiện với môi trường không chỉ là xu hướng mà đã trở thành trách nhiệm...',
      category: 'environment',
      author: 'Minh Anh',
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '5 phút đọc'
    },
    {
      id: 2,
      title: 'Đặc sản Bến Tre: Hành trình từ vườn dừa đến bàn ăn',
      excerpt: 'Tìm hiểu về quy trình sản xuất kẹo dừa truyền thống và cách CODY hiện đại hóa để giữ nguyên hương vị quê hương.',
      content: 'Bến Tre được mệnh danh là "xứ dừa" với hơn 200.000 hecta vườn dừa, cung cấp nguồn nguyên liệu dồi dào cho ngành chế biến...',
      category: 'cuisine',
      author: 'Tuấn Việt',
      date: '2024-01-10',
      image: 'https://images.pexels.com/photos/8142081/pexels-photo-8142081.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '7 phút đọc'
    },
    {
      id: 3,
      title: 'Lối sống xanh: Bắt đầu từ những thói quen đơn giản',
      excerpt: 'Những thay đổi nhỏ trong cuộc sống hàng ngày có thể mang lại tác động tích cực lớn đến môi trường.',
      content: 'Lối sống xanh không có nghĩa là bạn phải thay đổi hoàn toàn cuộc sống của mình. Thực tế, những thói quen đơn giản...',
      category: 'lifestyle',
      author: 'Lan Hương',
      date: '2024-01-05',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '4 phút đọc'
    },
    {
      id: 4,
      title: 'Văn hóa ẩm thực Việt Nam qua những món ngọt truyền thống',
      excerpt: 'Khám phá sự phong phú của văn hóa ẩm thực Việt Nam thông qua các món ngọt truyền thống từ Nam ra Bắc.',
      content: 'Món ngọt trong văn hóa Việt Nam không chỉ là thức ăn mà còn chứa đựng những câu chuyện văn hóa sâu sắc...',
      category: 'culture',
      author: 'Mai Phương',
      date: '2024-01-01',
      image: 'https://images.pexels.com/photos/8964887/pexels-photo-8964887.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '6 phút đọc'
    },
    {
      id: 5,
      title: 'Bảo vệ đa dạng sinh học: Vai trò của nông nghiệp bền vững',
      excerpt: 'Tìm hiểu cách các phương pháp canh tác bền vững góp phần bảo vệ đa dạng sinh học và hệ sinh thái.',
      content: 'Đa dạng sinh học đóng vai trò quan trọng trong việc duy trì sự cân bằng của hệ sinh thái...',
      category: 'environment',
      author: 'Hoàng Nam',
      date: '2023-12-28',
      image: 'https://images.pexels.com/photos/2872418/pexels-photo-2872418.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '8 phút đọc'
    },
    {
      id: 6,
      title: 'Xu hướng tiêu dùng xanh và tác động đến ngành thực phẩm',
      excerpt: 'Phân tích xu hướng tiêu dùng xanh hiện tại và những thay đổi tích cực trong ngành sản xuất thực phẩm.',
      content: 'Tiêu dùng xanh đang trở thành xu hướng chủ đạo, đặc biệt là trong ngành thực phẩm...',
      category: 'lifestyle',
      author: 'Thu Hà',
      date: '2023-12-25',
      image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600',
      readTime: '5 phút đọc'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
            Blog & Tin tức
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những câu chuyện về môi trường, lối sống xanh và văn hóa ẩm thực Việt Nam
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === 'all' && !searchTerm && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Nổi bật
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-brown font-playfair mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <button className="inline-flex items-center text-primary-green hover:text-primary-green/80 font-semibold group">
                      Đọc tiếp
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'all' && !searchTerm ? otherPosts : filteredPosts).map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    post.category === 'environment' ? 'bg-primary-green' :
                    post.category === 'lifestyle' ? 'bg-accent-green' :
                    post.category === 'cuisine' ? 'bg-warm-brown' :
                    'bg-light-green'
                  }`}>
                    {categories.find(c => c.id === post.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </div>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-warm-brown mb-3 group-hover:text-primary-green transition-colors font-playfair">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  
                  <button className="inline-flex items-center text-primary-green hover:text-primary-green/80 font-semibold text-sm group/btn">
                    Đọc tiếp
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy bài viết
            </h3>
            <p className="text-gray-500">
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;