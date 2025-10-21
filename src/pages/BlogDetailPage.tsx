import { ArrowLeft, Calendar, Clock, Facebook, User, Link as LinkIcon, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { blogPosts, categories } from '../data/blogPosts';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({ open: false, type: 'success', title: '', message: '' });

  const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setToast({ open: true, type, title, message });
  };

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (shareMenuOpen && !target.closest('.share-dropdown-container')) {
        setShareMenuOpen(false);
      }
    };
    if (shareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareMenuOpen]);

  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-warm-brown mb-4">
            Không tìm thấy bài viết
          </h2>
          <Link to="/blog" className="text-primary-green hover:underline">
            Quay lại danh sách bài viết
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories.find((c) => c.id === post.category);
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      showToast('success', 'Đã sao chép!', 'Link bài viết đã được sao chép vào clipboard.');
      setShareMenuOpen(false);
    });
  };

  const handleShareFacebook = () => {
    const currentUrl = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    setShareMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Open Graph Meta Tags for Social Sharing */}
      <Helmet>
        <title>{post.title} - Cody Coconut Candy Blog</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`${post.title} - Cody Coconut Candy Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Article specific */}
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={categoryInfo?.name} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={`${post.title} - Cody Coconut Candy Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Link to="/" className="hover:text-white">
                Trang chủ
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{categoryInfo?.name}</span>
            </div>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                  post.category === 'environment'
                    ? 'bg-primary-green'
                    : post.category === 'lifestyle'
                    ? 'bg-accent-green'
                    : post.category === 'cuisine'
                    ? 'bg-warm-brown'
                    : 'bg-light-green'
                }`}
              >
                {categoryInfo?.name}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-playfair mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button & Share */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-primary-green hover:text-primary-green/80 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại Blog
          </button>

          {/* Share Button with Dropdown */}
          <div className="relative share-dropdown-container">
            <button 
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Chia sẻ
            </button>

            {/* Share Dropdown Menu */}
            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-warm-brown hover:bg-gray-50 transition-colors"
                >
                  <LinkIcon className="h-5 w-5 text-gray-600" />
                  <span>Sao chép link</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleShareFacebook}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-warm-brown hover:bg-blue-50 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span>Chia sẻ lên Facebook</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-xl text-gray-600 font-medium mb-8 leading-relaxed border-l-4 border-primary-green pl-6 italic">
            {post.excerpt}
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            {post.fullContent.map((paragraph, index) => (
              <p key={index} className="text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Author Info */}
        <div className="mt-12 p-6 bg-sage-green/10 rounded-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-primary-green flex items-center justify-center text-white text-2xl font-bold">
                {post.author.charAt(0)}
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-warm-brown">
                {post.author}
              </h3>
              <p className="text-gray-600">
                Tác giả tại CODY Coconut Candy
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-warm-brown font-playfair mb-8">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-warm-brown group-hover:text-primary-green transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(relatedPost.date).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.open && (
        <Toast
          open={toast.open}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
    </div>
  );
};

export default BlogDetailPage;
