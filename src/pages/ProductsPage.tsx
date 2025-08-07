import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allProducts, categories } from '../data/products';

const ProductsPage = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts
    .filter(product =>
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-warm-brown font-playfair mb-4">
            Sản phẩm CODY
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá bộ sưu tập kẹo dừa sinh thái từ Bến Tre
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search - Using Catalyst Input with leading icon */}
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm"
              />
            </div>

            {/* Filters - Stack on mobile, flex on desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* Category Filter - Using Catalyst Select */}
              <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-green sm:text-sm"
                >
                  <option value="all">Tất cả danh mục</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Sort  */}
              <div className="relative w-full sm:w-auto sm:min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-green sm:text-sm"
                >
                  <option value="name">Sắp xếp theo tên</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* View Mode */}
              <div className="inline-flex self-start sm:self-auto sm:ml-auto rounded-md shadow-sm isolate" role="group">
                <button
                  onClick={() => setViewMode('grid')}
                  type="button"
                  className={`relative rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${viewMode === 'grid'
                      ? 'bg-primary-green text-white hover:bg-primary-green/90 ring-primary-green'
                      : 'bg-white text-gray-700 hover:bg-gray-50 ring-gray-300'
                    }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  type="button"
                  className={`relative -ml-px rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset focus:z-10 ${viewMode === 'list'
                      ? 'bg-primary-green text-white hover:bg-primary-green/90 ring-primary-green'
                      : 'bg-white text-gray-700 hover:bg-gray-50 ring-gray-300'
                    }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Active Filters - Added Feature */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="flex flex-wrap gap-2 pt-2 items-center">
                <span className="text-xs text-gray-500">Bộ lọc đang áp dụng:</span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center rounded-md bg-primary-green/10 px-2 py-1 text-xs font-medium text-primary-green">
                    {categories.find(c => c.id === selectedCategory)?.name}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="ml-1 text-primary-green hover:text-primary-green/70"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </span>
                )}

                {searchTerm && (
                  <span className="inline-flex items-center rounded-md bg-primary-green/10 px-2 py-1 text-xs font-medium text-primary-green">
                    Tìm: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 text-primary-green hover:text-primary-green/70"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị {filteredProducts.length} sản phẩm
            {selectedCategory !== 'all' && (
              <span> trong danh mục "{categories.find(c => c.id === selectedCategory)?.name}"</span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'grid-cols-1'
          }`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;